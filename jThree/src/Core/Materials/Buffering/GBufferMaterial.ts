import IMaterialConfigureArgument = require("../Base/IMaterialConfigureArgument");
﻿import Material = require("./../Material");
import Vector3 = require("../../../Math/Vector3");
import Vector4 = require("../../../Math/Vector4");
import IMaterialConfig = require("./../IMaterialConfig");
import BasicMaterial = require("../Base/BasicMaterial");
/**
 * Provides how to write g-buffers.
 * This material have 3 pass for darawing g-buffers.
 * 1-st technique Normal.XY Depth Shiningness
 * 2-nd technique Diffuse.RGBA
 * 3-rd technique Specular.RGB
 */
class GBufferMaterial extends Material {
  public get MaterialGroup(): string {
    return "jthree.materials.gbuffer";
  }

  private primaryMaterial: BasicMaterial;

  private secoundaryMaterial: BasicMaterial;

  private thirdMaterial: BasicMaterial;

  constructor() {
    super();
    this.primaryMaterial = new BasicMaterial(require("../BuiltIn/GBuffer/PrimaryBuffer.html"));
    this.secoundaryMaterial = new BasicMaterial(require("../BuiltIn/GBuffer/SecoundaryBuffer.html"));
    this.thirdMaterial = new BasicMaterial(require("../BuiltIn/GBuffer/ThirdBuffer.html"));
    this.setLoaded();
  }

  public configureMaterial(matArg: IMaterialConfigureArgument): void {
    switch (matArg.techniqueIndex) {
      case 0:
        this.configurePrimaryBuffer(matArg);
        break;
      case 1:
        this.configureSecoundaryBuffer(matArg);
        break;
      case 2:
        this.configureThirdBuffer(matArg);
        break;
    }
  }

  public getMaterialConfig(pass: number, technique: number): IMaterialConfig {
    if (technique === 0) {
      return {
        blend: false,
        cull: "ccw"
      };
    }
    if (technique === 1) {
      return {
        blend: true,
        cull: "ccw"
      };
    } else {
      return {
       blend: false,
        cull: "ccw"
      };
    }
  }
  /**
   * Configure shader for 1-st pass.
   * @return {[type]}                     [description]
   */
  private configurePrimaryBuffer(matArg: IMaterialConfigureArgument) {
    const fm = matArg.object.getMaterial("jthree.materials.forematerial"); // shiningness
    let coefficient = 0;
    const fmArgs = fm.materialVariables;
    if (fmArgs["brightness"]) { coefficient = fmArgs["brightness"]; }
    this.primaryMaterial.materialVariables["brightness"] = coefficient;
    this.primaryMaterial.configureMaterial(matArg);
  }
  /**
   * Configure shader for 2nd pass.
   * @return {[type]}                     [description]
   */
  private configureSecoundaryBuffer(matArg: IMaterialConfigureArgument) {
    const fm = matArg.object.getMaterial("jthree.materials.forematerial");
    const fmArgs = fm.materialVariables;
    let albedo;
    if (fm && fm.materialVariables["diffuse"]) {// TODO there should be good implementation
      albedo = fm.materialVariables["diffuse"].toVector();
    } else {
      albedo = new Vector4(1, 0, 0, 1);
    }
    this.secoundaryMaterial.materialVariables["albedo"] = albedo;
    this.secoundaryMaterial.materialVariables["textureUsed"] = 0;
    this.secoundaryMaterial.materialVariables["texture"] = fmArgs["texture"];
    this.secoundaryMaterial.configureMaterial(matArg);
  }

  /**
   * Configure shader for 3rd pass.
   * @return {[type]}                     [description]
   */
  private configureThirdBuffer(matArg: IMaterialConfigureArgument) {
    const fm = matArg.object.getMaterial("jthree.materials.forematerial");
    const fmArgs = fm.materialVariables;
    let specular;
    if (fm && fmArgs["specular"]) {
      specular = fmArgs["specular"];
    } else {
      specular = new Vector3(1, 0, 0);
    }
    this.thirdMaterial.materialVariables["specular"] = specular;
    this.thirdMaterial.configureMaterial(matArg);
  }
}

export = GBufferMaterial;
