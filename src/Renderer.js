import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import ReactDOM from 'react-dom';

class Renderer extends React.Component {
  constructor(props, context) {
    super(props, context);

    // construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.
    this.cameraPosition = new THREE.Vector3(0, 0, 5);

    this.state = {
      cubeRotation: new THREE.Euler(),
    };

    this._onAnimate = () => {
      // we will get this callback every frame

      // pretend cubeRotation is immutable.
      // this helps with updates and pure rendering.
      // React will be sure that the rotation has now updated.
      this.setState({
        cubeRotation: new THREE.Euler(
          this.state.cubeRotation.x + 0.1,
          this.state.cubeRotation.y + 0.1,
          0
        ),
      });
    };
  }

  componentDidMount = () => {
    const { modelPath } = this.props;
    this.loadObject(modelPath);
  }
  

  loadObject(objectPath) {
    let loader = new THREE.ObjectLoader(),
      _this = this;

    loader.load(
      objectPath,
      function (model) {
        let light = new THREE.DirectionalLight(0xffffff);
        light.position.set(0, 2, 2);
        light.target.position.set(1, 0, 0);
        light.castShadow = true;
        light.shadowDarkness = 0.5;
        light.shadowCameraVisible = true; // only for debugging
        // these six values define the boundaries of the yellow box seen above
        light.shadowCameraNear = 0;
        light.shadowCameraFar = 5;
        light.shadowCameraLeft = -0.5;
        light.shadowCameraRight = 0.5;
        light.shadowCameraTop = 0;
        light.shadowCameraBottom = -0.5;
        _this.refs['myScene'].add(light);

        model.scale.set(1, 1, 1)
        model.position.set(0, 0, 0)

        _this.refs['myScene'].add(model)

        if (_this.rotationInterval) {
          clearInterval(_this.rotationInterval)
        }

        _this.rotationInterval = setInterval(() => {
          model.rotation.set(_this.state.cubeRotation.x, _this.state.cubeRotation.y, 0);
        }, 500)

      }
    );
  }

  render() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    return (
      <React3
        mainCamera="camera"
        width={width}
        height={height}

        onAnimate={this._onAnimate}
      >
        <scene ref={'myScene'}>
          <perspectiveCamera
            ref={'myCamera'}
            name="camera"
            fov={100}
            aspect={((window.innerWidth / 12) * 10) / (window.innerHeight)}
            near={0.1}
            far={1000}
            position={this.cameraPosition}
          />

        </scene>
      </React3>
    );
  }
}

export default Renderer;