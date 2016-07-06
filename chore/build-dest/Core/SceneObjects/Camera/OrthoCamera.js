import ViewCamera from "./ViewCameraBase";
import { mat4 } from "gl-matrix";
class OrthoCamera extends ViewCamera {
    constructor() {
        super();
        this._updateProjectionMatrix();
    }
    _updateProjectionMatrix() {
        mat4.ortho(this.projectionMatrix.rawElements, this.Left, this.Right, this.Bottom, this.Top, this.Near, this.Far);
        mat4.invert(this.invProjectionMatrix.rawElements, this.projectionMatrix.rawElements);
        this.__updateViewProjectionMatrix();
    }
    get Left() {
        return this._left;
    }
    set Left(left) {
        this._left = left;
        this._updateProjectionMatrix();
    }
    get Right() {
        return this._right;
    }
    set Right(right) {
        this._right = right;
        this._updateProjectionMatrix();
    }
    get Top() {
        return this._top;
    }
    set Top(_top) {
        this._top = _top;
        this._updateProjectionMatrix();
    }
    get Bottom() {
        return this._bottom;
    }
    set Bottom(bottom) {
        this._bottom = bottom;
        this._updateProjectionMatrix();
    }
    get Near() {
        return this._near;
    }
    set Near(near) {
        this._near = near;
        this._updateProjectionMatrix();
    }
    get Far() {
        return this._far;
    }
    set Far(far) {
        this._far = far;
        this._updateProjectionMatrix();
    }
}
export default OrthoCamera;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvcmUvU2NlbmVPYmplY3RzL0NhbWVyYS9PcnRob0NhbWVyYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiT0FBTyxVQUFVLE1BQU0sa0JBQWtCO09BQ2xDLEVBQUMsSUFBSSxFQUFDLE1BQU0sV0FBVztBQUM5QiwwQkFBMEIsVUFBVTtJQVFoQztRQUNJLE9BQU8sQ0FBQztRQUNSLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFTyx1QkFBdUI7UUFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNyRixJQUFJLENBQUMsNEJBQTRCLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBRUQsSUFBVyxJQUFJO1FBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQVcsSUFBSSxDQUFDLElBQVk7UUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVELElBQVcsS0FBSztRQUNaLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFXLEtBQUssQ0FBQyxLQUFhO1FBQzFCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCxJQUFXLEdBQUc7UUFDVixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRUQsSUFBVyxHQUFHLENBQUMsSUFBWTtRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRUQsSUFBVyxNQUFNO1FBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUVELElBQVcsTUFBTSxDQUFDLE1BQWM7UUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVELElBQVcsSUFBSTtRQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFXLElBQUksQ0FBQyxJQUFZO1FBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCxJQUFXLEdBQUc7UUFDVixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRUQsSUFBVyxHQUFHLENBQUMsR0FBVztRQUN0QixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUNoQixJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0FBRUwsQ0FBQztBQUVELGVBQWUsV0FBVyxDQUFDIiwiZmlsZSI6IkNvcmUvU2NlbmVPYmplY3RzL0NhbWVyYS9PcnRob0NhbWVyYS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWaWV3Q2FtZXJhIGZyb20gXCIuL1ZpZXdDYW1lcmFCYXNlXCI7XG5pbXBvcnQge21hdDR9IGZyb20gXCJnbC1tYXRyaXhcIjtcbmNsYXNzIE9ydGhvQ2FtZXJhIGV4dGVuZHMgVmlld0NhbWVyYSB7XG4gICAgcHJpdmF0ZSBfbGVmdDogbnVtYmVyO1xuICAgIHByaXZhdGUgX3JpZ2h0OiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfdG9wOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfYm90dG9tOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfbmVhcjogbnVtYmVyO1xuICAgIHByaXZhdGUgX2ZhcjogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF91cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk6IHZvaWQge1xuICAgICAgICBtYXQ0Lm9ydGhvKHRoaXMucHJvamVjdGlvbk1hdHJpeC5yYXdFbGVtZW50cywgdGhpcy5MZWZ0LCB0aGlzLlJpZ2h0LCB0aGlzLkJvdHRvbSwgdGhpcy5Ub3AsIHRoaXMuTmVhciwgdGhpcy5GYXIpO1xuICAgICAgICBtYXQ0LmludmVydCh0aGlzLmludlByb2plY3Rpb25NYXRyaXgucmF3RWxlbWVudHMsIHRoaXMucHJvamVjdGlvbk1hdHJpeC5yYXdFbGVtZW50cyk7XG4gICAgICAgIHRoaXMuX191cGRhdGVWaWV3UHJvamVjdGlvbk1hdHJpeCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgTGVmdCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGVmdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IExlZnQobGVmdDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2xlZnQgPSBsZWZ0O1xuICAgICAgICB0aGlzLl91cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBSaWdodCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmlnaHQ7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBSaWdodChyaWdodDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3JpZ2h0ID0gcmlnaHQ7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IFRvcCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fdG9wO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgVG9wKF90b3A6IG51bWJlcikge1xuICAgICAgICB0aGlzLl90b3AgPSBfdG9wO1xuICAgICAgICB0aGlzLl91cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBCb3R0b20oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ib3R0b207XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBCb3R0b20oYm90dG9tOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fYm90dG9tID0gYm90dG9tO1xuICAgICAgICB0aGlzLl91cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBOZWFyKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9uZWFyO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgTmVhcihuZWFyOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fbmVhciA9IG5lYXI7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IEZhcigpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmFyO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgRmFyKGZhcjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2ZhciA9IGZhcjtcbiAgICAgICAgdGhpcy5fdXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBPcnRob0NhbWVyYTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==