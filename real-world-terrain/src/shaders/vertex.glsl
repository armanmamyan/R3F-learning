 uniform sampler2D bumpTexture;
          uniform float bumpScale;
        
          varying float vAmount;
          varying vec2 vUV;
          
          void main()
          {
              vUV = uv;
          
              vec4 bumpData = texture2D(bumpTexture, uv);
          
              vAmount = bumpData.r;
          
              vec3 newPosition = position + normal * bumpScale * vAmount;
          
              gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
          }