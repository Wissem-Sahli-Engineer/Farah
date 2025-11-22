"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const Orb = ({
  images = [],
  totalItems = images.length || 50,
  baseWidth = 1,
  baseHeight = 0.6,
  sphereRadius = 5,
  backgroundColor = "#000000ff",
}) => {
  const orbRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const isAnimatingRef = useRef(false);
  const focusedMeshRef = useRef(null);
  const meshesRef = useRef([]);
  const sceneRef = useRef(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    if (images.length === 0) {
      console.warn("No images provided to Orb component!");
      return;
    }

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(backgroundColor, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    rendererRef.current = renderer;

    if (!orbRef.current) {
      console.error("orbRef.current is null on mount!");
      return;
    }

    // Clear any existing children before appending
    while (orbRef.current.firstChild) {
      orbRef.current.removeChild(orbRef.current.firstChild);
    }
    orbRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 1.2;
    controls.minDistance = 6;
    controls.maxDistance = 10;
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controlsRef.current = controls;

    const textureLoader = new THREE.TextureLoader();
    let loadedCount = 0;
    const meshes = [];
    meshesRef.current = meshes;

    const createImagePlane = (texture) => {
      const imageAspect = texture.image ? texture.image.width / texture.image.height : 1;
      let width = baseWidth;
      let height = baseHeight;
      if (imageAspect > 1) {
        height = width / imageAspect;
      } else {
        width = height * imageAspect;
      }
      return new THREE.PlaneGeometry(width, height);
    };

    const loadImageMesh = (phi, theta, index) => {
      const imagePath = images[index % images.length];
      textureLoader.load(
        imagePath,
        (texture) => {
          texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
          texture.generateMipmaps = true;
          texture.minFilter = THREE.LinearMipmapLinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.encoding = THREE.sRGBEncoding;

          const geometry = createImagePlane(texture);
          const material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1,
            depthWrite: true,
            depthTest: true,
          });

          const mesh = new THREE.Mesh(geometry, material);
          mesh.position.x = sphereRadius * Math.cos(theta) * Math.sin(phi);
          mesh.position.y = sphereRadius * Math.sin(theta) * Math.sin(phi);
          mesh.position.z = sphereRadius * Math.cos(phi);
          mesh.lookAt(0, 0, 0);
          mesh.rotateY(Math.PI);
          
          mesh.userData.originalPosition = mesh.position.clone();
          mesh.userData.originalOpacity = 1;
          
          scene.add(mesh);
          meshes.push(mesh);

          loadedCount++;
          const progress = (loadedCount / totalItems) * 100;
          setLoadProgress(Math.round(progress));
          
          if (loadedCount === totalItems) {
            console.log("All images loaded!");
            setTimeout(() => setIsLoading(false), 500);
          }
        },
        undefined,
        (error) => {
          console.error(`Image load error for ${imagePath}:`, error);
          loadedCount++;
          const progress = (loadedCount / totalItems) * 100;
          setLoadProgress(Math.round(progress));
          
          if (loadedCount === totalItems) {
            setTimeout(() => setIsLoading(false), 500);
          }
        }
      );
    };

    const createSphere = () => {
      for (let i = 0; i < totalItems; i++) {
        const phi = Math.acos(-1 + (2 * i) / totalItems);
        const theta = Math.sqrt(totalItems * Math.PI) * phi;
        loadImageMesh(phi, theta, i);
      }
    };

    camera.position.z = 10;

    // Focus animation with zoom and fade effect
    const animateCameraToMesh = (mesh) => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;
      focusedMeshRef.current = mesh;
      controls.autoRotate = false;
      controls.enabled = false;

      const targetPosition = mesh.position.clone();
      const direction = targetPosition.clone().normalize();
      const distance = 0.3; // Extremely close to the photo
      const newCameraPosition = direction.multiplyScalar(sphereRadius + distance);

      const startPosition = camera.position.clone();

      let progress = 0;
      const duration = 1200;
      const startTime = Date.now();

      const animateCamera = () => {
        const elapsed = Date.now() - startTime;
        progress = Math.min(elapsed / duration, 1);

        // Simple linear interpolation for direct zoom
        const easeProgress = progress;

        camera.position.lerpVectors(startPosition, newCameraPosition, easeProgress);
        camera.lookAt(targetPosition);
        
        // Fade out other meshes
        meshes.forEach((m) => {
          if (m !== mesh) {
            m.material.opacity = 1 - (easeProgress * 0.9);
          }
        });
        
        controls.update();

        if (progress < 1) {
          requestAnimationFrame(animateCamera);
        } else {
          isAnimatingRef.current = false;
        }
      };

      animateCamera();
    };

    // Reset animation
    const resetView = () => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;

      const startPosition = camera.position.clone();
      const endPosition = new THREE.Vector3(0, 0, 10);
      const startTarget = controls.target.clone();
      const endTarget = new THREE.Vector3(0, 0, 0);

      let progress = 0;
      const duration = 1000;
      const startTime = Date.now();

      const animateBack = () => {
        const elapsed = Date.now() - startTime;
        progress = Math.min(elapsed / duration, 1);

        const easeProgress = progress < 0.5
          ? 2 * progress * progress
          : -1 + (4 - 2 * progress) * progress;

        camera.position.lerpVectors(startPosition, endPosition, easeProgress);
        controls.target.lerpVectors(startTarget, endTarget, easeProgress);
        
        // Reset all meshes
        meshes.forEach((m) => {
          m.material.opacity = easeProgress * 0.1 + (1 - easeProgress) * m.material.opacity;
          if (easeProgress >= 1) {
            m.material.opacity = 1;
          }
        });
        
        controls.update();

        if (progress < 1) {
          requestAnimationFrame(animateBack);
        } else {
          isAnimatingRef.current = false;
          focusedMeshRef.current = null;
          controls.autoRotate = true;
          controls.enabled = true;
        }
      };

      animateBack();
    };

    // Click handler
    const handleClick = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const intersects = raycasterRef.current.intersectObjects(meshes);

      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object;
        if (focusedMeshRef.current === clickedMesh) {
          resetView();
        } else {
          animateCameraToMesh(clickedMesh);
        }
      } else if (focusedMeshRef.current) {
        resetView();
      }
    };

    renderer.domElement.addEventListener("click", handleClick);
    renderer.domElement.style.cursor = "pointer";

    const animate = () => {
      requestAnimationFrame(animate);
      if (!isAnimatingRef.current && !focusedMeshRef.current) {
        controls.update();
      }
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!renderer || !camera) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);
    createSphere();

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("click", handleClick);
      
      if (orbRef.current && rendererRef.current?.domElement) {
        try {
          orbRef.current.removeChild(rendererRef.current.domElement);
        } catch (e) {
          console.warn("Cleanup warning:", e);
        }
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
      
      if (meshes.length > 0) {
        meshes.forEach((mesh) => {
          if (mesh.material.map) mesh.material.map.dispose();
          mesh.material.dispose();
          mesh.geometry.dispose();
        });
      }
    };
  }, [images, totalItems, baseWidth, baseHeight, sphereRadius, backgroundColor]);

  return (
    <div style={{ width: "100%", height: "100dvh", position: "relative",overflow: "hidden" }}>
      {isLoading && (
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: backgroundColor,
          zIndex: 1000,
        }}>
          <div style={{
            width: "200px",
            height: "4px",
            backgroundColor: "rgba(255,255,255,0.2)",
            borderRadius: "2px",
            overflow: "hidden",
            marginBottom: "20px"
          }}>
            <div style={{
              width: `${loadProgress}%`,
              height: "100%",
              backgroundColor: "#ffffff",
              transition: "width 0.3s ease",
            }} />
          </div>
          <div style={{
            color: "white",
            fontSize: "18px",
            fontFamily: "sans-serif",
            fontWeight: "300",
            letterSpacing: "2px"
          }}>
            LOADING {loadProgress}%
          </div>
          <div style={{
            marginTop: "30px",
            display: "flex",
            gap: "8px"
          }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite`,
                }}
              />
            ))}
          </div>
          <style>{`
            @keyframes pulse {
              0%, 100% { opacity: 0.3; transform: scale(0.8); }
              50% { opacity: 1; transform: scale(1.2); }
            }
          `}</style>
        </div>
      )}
      <div 
        className="orb" 
        ref={orbRef} 
        style={{ 
          width: "100%", 
          height: "100%",
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.5s ease"
        }} 
      />
    </div>
  );
};

export default Orb;