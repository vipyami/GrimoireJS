import BasicMaterial from "../../../Materials/Base/BasicMaterial";
import ContextComponents from "../../../../ContextComponents";
import JThreeContext from "../../../../JThreeContext";
import LightBase from "./../LightBase";
import Matrix from "../../../../Math/Matrix";
/**
 * Provides area light feature.
 */
class AreaLight extends LightBase {
    constructor() {
        super();
        this.intensity = 1.0;
        this.Geometry = JThreeContext.getContextComponent(ContextComponents.PrimitiveRegistory).getPrimitive("cube");
        const material = new BasicMaterial(require("../../../Materials/BuiltIn/Light/Diffuse/AreaLight.html"));
        material.on("apply", (matArg) => {
            material.materialVariables = {
                lightColor: this.Color.toVector().multiplyWith(this.intensity),
                areaMatrix: Matrix.inverse(Matrix.multiply(matArg.camera.viewMatrix, matArg.object.Transformer.LocalToGlobal))
            };
        });
        this.addMaterial(material);
    }
}
export default AreaLight;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvcmUvU2NlbmVPYmplY3RzL0xpZ2h0L0ltcGwvQXJlYUxpZ2h0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJPQUNPLGFBQWEsTUFBTSx1Q0FBdUM7T0FDMUQsaUJBQWlCLE1BQU0sK0JBQStCO09BRXRELGFBQWEsTUFBTSwyQkFBMkI7T0FDOUMsU0FBUyxNQUFNLGdCQUFnQjtPQUMvQixNQUFNLE1BQU0seUJBQXlCO0FBRTVDOztHQUVHO0FBQ0gsd0JBQXdCLFNBQVM7SUFDL0I7UUFDRSxPQUFPLENBQUM7UUFZSCxjQUFTLEdBQVcsR0FBRyxDQUFDO1FBWDdCLElBQUksQ0FBQyxRQUFRLEdBQUcsYUFBYSxDQUFDLG1CQUFtQixDQUFxQixpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqSSxNQUFNLFFBQVEsR0FBRyxJQUFJLGFBQWEsQ0FBQyxPQUFPLENBQUMseURBQXlELENBQUMsQ0FBQyxDQUFDO1FBQ3ZHLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBOEI7WUFDbEQsUUFBUSxDQUFDLGlCQUFpQixHQUFHO2dCQUMzQixVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQkFDOUQsVUFBVSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUMvRyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzdCLENBQUM7QUFHSCxDQUFDO0FBRUQsZUFBZSxTQUFTLENBQUMiLCJmaWxlIjoiQ29yZS9TY2VuZU9iamVjdHMvTGlnaHQvSW1wbC9BcmVhTGlnaHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSUFwcGx5TWF0ZXJpYWxBcmd1bWVudCBmcm9tIFwiLi4vLi4vLi4vTWF0ZXJpYWxzL0Jhc2UvSUFwcGx5TWF0ZXJpYWxBcmd1bWVudFwiO1xuaW1wb3J0IEJhc2ljTWF0ZXJpYWwgZnJvbSBcIi4uLy4uLy4uL01hdGVyaWFscy9CYXNlL0Jhc2ljTWF0ZXJpYWxcIjtcbmltcG9ydCBDb250ZXh0Q29tcG9uZW50cyBmcm9tIFwiLi4vLi4vLi4vLi4vQ29udGV4dENvbXBvbmVudHNcIjtcbmltcG9ydCBQcmltaXRpdmVSZWdpc3RvcnkgZnJvbSBcIi4uLy4uLy4uL0dlb21ldHJpZXMvQmFzZS9QcmltaXRpdmVSZWdpc3RvcnlcIjtcbmltcG9ydCBKVGhyZWVDb250ZXh0IGZyb20gXCIuLi8uLi8uLi8uLi9KVGhyZWVDb250ZXh0XCI7XG5pbXBvcnQgTGlnaHRCYXNlIGZyb20gXCIuLy4uL0xpZ2h0QmFzZVwiO1xuaW1wb3J0IE1hdHJpeCBmcm9tIFwiLi4vLi4vLi4vLi4vTWF0aC9NYXRyaXhcIjtcblxuLyoqXG4gKiBQcm92aWRlcyBhcmVhIGxpZ2h0IGZlYXR1cmUuXG4gKi9cbmNsYXNzIEFyZWFMaWdodCBleHRlbmRzIExpZ2h0QmFzZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5HZW9tZXRyeSA9IEpUaHJlZUNvbnRleHQuZ2V0Q29udGV4dENvbXBvbmVudDxQcmltaXRpdmVSZWdpc3Rvcnk+KENvbnRleHRDb21wb25lbnRzLlByaW1pdGl2ZVJlZ2lzdG9yeSkuZ2V0UHJpbWl0aXZlKFwiY3ViZVwiKTtcbiAgICBjb25zdCBtYXRlcmlhbCA9IG5ldyBCYXNpY01hdGVyaWFsKHJlcXVpcmUoXCIuLi8uLi8uLi9NYXRlcmlhbHMvQnVpbHRJbi9MaWdodC9EaWZmdXNlL0FyZWFMaWdodC5odG1sXCIpKTtcbiAgICBtYXRlcmlhbC5vbihcImFwcGx5XCIsIChtYXRBcmc6IElBcHBseU1hdGVyaWFsQXJndW1lbnQpID0+IHtcbiAgICAgIG1hdGVyaWFsLm1hdGVyaWFsVmFyaWFibGVzID0ge1xuICAgICAgICBsaWdodENvbG9yOiB0aGlzLkNvbG9yLnRvVmVjdG9yKCkubXVsdGlwbHlXaXRoKHRoaXMuaW50ZW5zaXR5KSxcbiAgICAgICAgYXJlYU1hdHJpeDogTWF0cml4LmludmVyc2UoTWF0cml4Lm11bHRpcGx5KG1hdEFyZy5jYW1lcmEudmlld01hdHJpeCwgbWF0QXJnLm9iamVjdC5UcmFuc2Zvcm1lci5Mb2NhbFRvR2xvYmFsKSlcbiAgICAgIH07XG4gICAgfSk7XG4gICAgdGhpcy5hZGRNYXRlcmlhbChtYXRlcmlhbCk7XG4gIH1cblxuICBwdWJsaWMgaW50ZW5zaXR5OiBudW1iZXIgPSAxLjA7XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFyZWFMaWdodDtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==