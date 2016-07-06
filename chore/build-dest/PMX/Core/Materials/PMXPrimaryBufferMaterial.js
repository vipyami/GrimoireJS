import BasicMaterial from "../../../Core/Materials/Base/BasicMaterial";
class PMXPrimaryBufferMaterial extends BasicMaterial {
    constructor(material) {
        super(require("../../Materials/PrimaryBuffer.html"));
        this._associatedMaterial = material;
    }
    apply(matArg) {
        if (this._associatedMaterial.Diffuse.A < 1.0E-3) {
            return;
        }
        const skeleton = this._associatedMaterial.ParentModel.skeleton;
        this.materialVariables = {
            boneMatriciesTexture: skeleton.MatrixTexture,
            brightness: this._associatedMaterial.Specular.W,
            boneCount: skeleton.BoneCount
        };
        super.apply(matArg);
    }
    /**
     * Count of verticies
     */
    get VerticiesCount() {
        return this._associatedMaterial.VerticiesCount;
    }
    /**
     * Offset of verticies in index buffer
     */
    get VerticiesOffset() {
        return this._associatedMaterial.VerticiesOffset;
    }
    getDrawGeometryLength(geo) {
        return this._associatedMaterial.Diffuse.A > 0 ? this.VerticiesCount : 0;
    }
    getDrawGeometryOffset(geo) {
        return this.VerticiesOffset * 4;
    }
}
export default PMXPrimaryBufferMaterial;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBNWC9Db3JlL01hdGVyaWFscy9QTVhQcmltYXJ5QnVmZmVyTWF0ZXJpYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ik9BR08sYUFBYSxNQUFNLDRDQUE0QztBQUN0RSx1Q0FBdUMsYUFBYTtJQUdsRCxZQUFZLFFBQXFCO1FBQy9CLE1BQU0sT0FBTyxDQUFDLG9DQUFvQyxDQUFDLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsUUFBUSxDQUFDO0lBQ3RDLENBQUM7SUFFTSxLQUFLLENBQUMsTUFBOEI7UUFDekMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNoRCxNQUFNLENBQUM7UUFDVCxDQUFDO1FBQ0QsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUM7UUFDL0QsSUFBSSxDQUFDLGlCQUFpQixHQUFHO1lBQ3ZCLG9CQUFvQixFQUFFLFFBQVEsQ0FBQyxhQUFhO1lBQzVDLFVBQVUsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDL0MsU0FBUyxFQUFFLFFBQVEsQ0FBQyxTQUFTO1NBQzlCLENBQUM7UUFDRixLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFRDs7T0FFRztJQUNILElBQVcsY0FBYztRQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGNBQWMsQ0FBQztJQUNqRCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFXLGVBQWU7UUFDeEIsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxlQUFlLENBQUM7SUFDbEQsQ0FBQztJQUVNLHFCQUFxQixDQUFDLEdBQWE7UUFDeEMsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRU0scUJBQXFCLENBQUMsR0FBYTtRQUN4QyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7SUFDbEMsQ0FBQztBQUVILENBQUM7QUFDRCxlQUFlLHdCQUF3QixDQUFDIiwiZmlsZSI6IlBNWC9Db3JlL01hdGVyaWFscy9QTVhQcmltYXJ5QnVmZmVyTWF0ZXJpYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2VvbWV0cnkgZnJvbSBcIi4uLy4uLy4uL0NvcmUvR2VvbWV0cmllcy9CYXNlL0dlb21ldHJ5XCI7XG5pbXBvcnQgUE1YTWF0ZXJpYWwgZnJvbSBcIi4vUE1YTWF0ZXJpYWxcIjtcbmltcG9ydCBJQXBwbHlNYXRlcmlhbEFyZ3VtZW50IGZyb20gXCIuLi8uLi8uLi9Db3JlL01hdGVyaWFscy9CYXNlL0lBcHBseU1hdGVyaWFsQXJndW1lbnRcIjtcbmltcG9ydCBCYXNpY01hdGVyaWFsIGZyb20gXCIuLi8uLi8uLi9Db3JlL01hdGVyaWFscy9CYXNlL0Jhc2ljTWF0ZXJpYWxcIjtcbmNsYXNzIFBNWFByaW1hcnlCdWZmZXJNYXRlcmlhbCBleHRlbmRzIEJhc2ljTWF0ZXJpYWwge1xuICBwcml2YXRlIF9hc3NvY2lhdGVkTWF0ZXJpYWw6IFBNWE1hdGVyaWFsO1xuXG4gIGNvbnN0cnVjdG9yKG1hdGVyaWFsOiBQTVhNYXRlcmlhbCkge1xuICAgIHN1cGVyKHJlcXVpcmUoXCIuLi8uLi9NYXRlcmlhbHMvUHJpbWFyeUJ1ZmZlci5odG1sXCIpKTtcbiAgICB0aGlzLl9hc3NvY2lhdGVkTWF0ZXJpYWwgPSBtYXRlcmlhbDtcbiAgfVxuXG4gIHB1YmxpYyBhcHBseShtYXRBcmc6IElBcHBseU1hdGVyaWFsQXJndW1lbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fYXNzb2NpYXRlZE1hdGVyaWFsLkRpZmZ1c2UuQSA8IDEuMEUtMykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBza2VsZXRvbiA9IHRoaXMuX2Fzc29jaWF0ZWRNYXRlcmlhbC5QYXJlbnRNb2RlbC5za2VsZXRvbjtcbiAgICB0aGlzLm1hdGVyaWFsVmFyaWFibGVzID0ge1xuICAgICAgYm9uZU1hdHJpY2llc1RleHR1cmU6IHNrZWxldG9uLk1hdHJpeFRleHR1cmUsXG4gICAgICBicmlnaHRuZXNzOiB0aGlzLl9hc3NvY2lhdGVkTWF0ZXJpYWwuU3BlY3VsYXIuVyxcbiAgICAgIGJvbmVDb3VudDogc2tlbGV0b24uQm9uZUNvdW50XG4gICAgfTtcbiAgICBzdXBlci5hcHBseShtYXRBcmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvdW50IG9mIHZlcnRpY2llc1xuICAgKi9cbiAgcHVibGljIGdldCBWZXJ0aWNpZXNDb3VudCgpIHtcbiAgICByZXR1cm4gdGhpcy5fYXNzb2NpYXRlZE1hdGVyaWFsLlZlcnRpY2llc0NvdW50O1xuICB9XG5cbiAgLyoqXG4gICAqIE9mZnNldCBvZiB2ZXJ0aWNpZXMgaW4gaW5kZXggYnVmZmVyXG4gICAqL1xuICBwdWJsaWMgZ2V0IFZlcnRpY2llc09mZnNldCgpIHtcbiAgICByZXR1cm4gdGhpcy5fYXNzb2NpYXRlZE1hdGVyaWFsLlZlcnRpY2llc09mZnNldDtcbiAgfVxuXG4gIHB1YmxpYyBnZXREcmF3R2VvbWV0cnlMZW5ndGgoZ2VvOiBHZW9tZXRyeSk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2Fzc29jaWF0ZWRNYXRlcmlhbC5EaWZmdXNlLkEgPiAwID8gdGhpcy5WZXJ0aWNpZXNDb3VudCA6IDA7XG4gIH1cblxuICBwdWJsaWMgZ2V0RHJhd0dlb21ldHJ5T2Zmc2V0KGdlbzogR2VvbWV0cnkpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLlZlcnRpY2llc09mZnNldCAqIDQ7XG4gIH1cblxufVxuZXhwb3J0IGRlZmF1bHQgUE1YUHJpbWFyeUJ1ZmZlck1hdGVyaWFsO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9