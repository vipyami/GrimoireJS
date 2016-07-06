import BasicTechnique from "./BasicTechnique";
import RenderStageBase from "../RenderStageBase";
class RSMLRenderStage extends RenderStageBase {
    constructor(renderer, rsmlSource) {
        super(renderer);
        this._parseRSML(rsmlSource);
    }
    get stageName() {
        return this._stageName;
    }
    getDefaultRendererConfigure(techniqueIndex) {
        return this.techniques[techniqueIndex].defaultRenderConfigure;
    }
    getSuperRendererConfigure() {
        return super.getDefaultRendererConfigure(0);
    }
    preTechnique(scene, techniqueIndex, texs) {
        this.techniques[techniqueIndex].preTechnique(scene, texs);
    }
    render(scene, object, techniqueCount, techniqueIndex, texs) {
        this.techniques[techniqueIndex].render(scene, object, techniqueCount, techniqueIndex, texs);
    }
    needRender(scene, object, techniqueIndex) {
        return typeof object.Geometry !== "undefined" && object.Geometry != null;
    }
    getTechniqueCount(scene) {
        return this._techniqueCount;
    }
    getTarget(techniqueIndex) {
        return this.techniques[techniqueIndex].Target;
    }
    _parseRSML(source) {
        this._parsedRSML = (new DOMParser()).parseFromString(source, "text/xml");
        const stageTag = this._parsedRSML.querySelector("rsml > stage");
        if (!stageTag) {
            console.error("Stage tag was not found in RSML");
            return;
        }
        this._stageName = stageTag.getAttribute("name");
        const techniqueTags = stageTag.querySelectorAll("technique");
        this._techniqueCount = techniqueTags.length;
        this.techniques = new Array(this._techniqueCount);
        for (let techniqueIndex = 0; techniqueIndex < this._techniqueCount; techniqueIndex++) {
            this.techniques[techniqueIndex] = new BasicTechnique(this, techniqueTags.item(techniqueIndex), techniqueIndex);
        }
    }
}
export default RSMLRenderStage;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvcmUvUmVuZGVyZXJzL1JlbmRlclN0YWdlcy9SU01ML1JTTUxSZW5kZXJTdGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiT0FDTyxjQUFjLE1BQU0sa0JBQWtCO09BR3RDLGVBQWUsTUFBTSxvQkFBb0I7QUFHaEQsOEJBQThCLGVBQWU7SUFTM0MsWUFBWSxRQUF1QixFQUFFLFVBQWtCO1FBQ3JELE1BQU0sUUFBUSxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsSUFBVyxTQUFTO1FBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFFTSwyQkFBMkIsQ0FBQyxjQUFzQjtRQUN2RCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQztJQUNoRSxDQUFDO0lBRU0seUJBQXlCO1FBQzlCLE1BQU0sQ0FBQyxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVNLFlBQVksQ0FBQyxLQUFZLEVBQUUsY0FBc0IsRUFBRSxJQUF1QjtRQUMvRSxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVNLE1BQU0sQ0FBQyxLQUFZLEVBQUUsTUFBbUIsRUFBRSxjQUFzQixFQUFFLGNBQXNCLEVBQUUsSUFBdUI7UUFDdEgsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlGLENBQUM7SUFFTSxVQUFVLENBQUMsS0FBWSxFQUFFLE1BQW1CLEVBQUUsY0FBc0I7UUFDekUsTUFBTSxDQUFDLE9BQU8sTUFBTSxDQUFDLFFBQVEsS0FBSyxXQUFXLElBQUksTUFBTSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUM7SUFDM0UsQ0FBQztJQUVNLGlCQUFpQixDQUFDLEtBQVk7UUFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDOUIsQ0FBQztJQUVNLFNBQVMsQ0FBQyxjQUFzQjtRQUNyQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxNQUFNLENBQUM7SUFDaEQsQ0FBQztJQUVPLFVBQVUsQ0FBQyxNQUFjO1FBQy9CLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxJQUFJLFNBQVMsRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztRQUN6RSxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNoRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDZCxPQUFPLENBQUMsS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7WUFDakQsTUFBTSxDQUFDO1FBQ1QsQ0FBQztRQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoRCxNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLGVBQWUsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDO1FBQzVDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2xELEdBQUcsQ0FBQyxDQUFDLElBQUksY0FBYyxHQUFHLENBQUMsRUFBRSxjQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxjQUFjLEVBQUUsRUFBRSxDQUFDO1lBQ3JGLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLEdBQUcsSUFBSSxjQUFjLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDakgsQ0FBQztJQUNILENBQUM7QUFDSCxDQUFDO0FBRUQsZUFBZSxlQUFlLENBQUMiLCJmaWxlIjoiQ29yZS9SZW5kZXJlcnMvUmVuZGVyU3RhZ2VzL1JTTUwvUlNNTFJlbmRlclN0YWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IElSZW5kZXJTdGFnZVJlbmRlcmVyQ29uZmlndXJlIGZyb20gXCIuLi9JUmVuZGVyU3RhZ2VSZW5kZXJlckNvbmZpZ3VyZVwiO1xuaW1wb3J0IEJhc2ljVGVjaG5pcXVlIGZyb20gXCIuL0Jhc2ljVGVjaG5pcXVlXCI7XG5pbXBvcnQgQmFzaWNSZW5kZXJlciBmcm9tIFwiLi4vLi4vQmFzaWNSZW5kZXJlclwiO1xuaW1wb3J0IFNjZW5lT2JqZWN0IGZyb20gXCIuLi8uLi8uLi9TY2VuZU9iamVjdHMvU2NlbmVPYmplY3RcIjtcbmltcG9ydCBSZW5kZXJTdGFnZUJhc2UgZnJvbSBcIi4uL1JlbmRlclN0YWdlQmFzZVwiO1xuaW1wb3J0IFNjZW5lIGZyb20gXCIuLi8uLi8uLi9TY2VuZVwiO1xuaW1wb3J0IFJlc29sdmVkQ2hhaW5JbmZvIGZyb20gXCIuLi8uLi9SZXNvbHZlZENoYWluSW5mb1wiO1xuY2xhc3MgUlNNTFJlbmRlclN0YWdlIGV4dGVuZHMgUmVuZGVyU3RhZ2VCYXNlIHtcbiAgcHVibGljIHRlY2huaXF1ZXM6IEJhc2ljVGVjaG5pcXVlW107XG5cbiAgcHJpdmF0ZSBfcGFyc2VkUlNNTDogRG9jdW1lbnQ7XG5cbiAgcHJpdmF0ZSBfdGVjaG5pcXVlQ291bnQ6IG51bWJlcjtcblxuICBwcml2YXRlIF9zdGFnZU5hbWU6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihyZW5kZXJlcjogQmFzaWNSZW5kZXJlciwgcnNtbFNvdXJjZTogc3RyaW5nKSB7XG4gICAgc3VwZXIocmVuZGVyZXIpO1xuICAgIHRoaXMuX3BhcnNlUlNNTChyc21sU291cmNlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc3RhZ2VOYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3N0YWdlTmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXREZWZhdWx0UmVuZGVyZXJDb25maWd1cmUodGVjaG5pcXVlSW5kZXg6IG51bWJlcik6IElSZW5kZXJTdGFnZVJlbmRlcmVyQ29uZmlndXJlIHtcbiAgICByZXR1cm4gdGhpcy50ZWNobmlxdWVzW3RlY2huaXF1ZUluZGV4XS5kZWZhdWx0UmVuZGVyQ29uZmlndXJlO1xuICB9XG5cbiAgcHVibGljIGdldFN1cGVyUmVuZGVyZXJDb25maWd1cmUoKTogSVJlbmRlclN0YWdlUmVuZGVyZXJDb25maWd1cmUge1xuICAgIHJldHVybiBzdXBlci5nZXREZWZhdWx0UmVuZGVyZXJDb25maWd1cmUoMCk7XG4gIH1cblxuICBwdWJsaWMgcHJlVGVjaG5pcXVlKHNjZW5lOiBTY2VuZSwgdGVjaG5pcXVlSW5kZXg6IG51bWJlciwgdGV4czogUmVzb2x2ZWRDaGFpbkluZm8pOiB2b2lkIHtcbiAgICB0aGlzLnRlY2huaXF1ZXNbdGVjaG5pcXVlSW5kZXhdLnByZVRlY2huaXF1ZShzY2VuZSwgdGV4cyk7XG4gIH1cblxuICBwdWJsaWMgcmVuZGVyKHNjZW5lOiBTY2VuZSwgb2JqZWN0OiBTY2VuZU9iamVjdCwgdGVjaG5pcXVlQ291bnQ6IG51bWJlciwgdGVjaG5pcXVlSW5kZXg6IG51bWJlciwgdGV4czogUmVzb2x2ZWRDaGFpbkluZm8pOiB2b2lkIHtcbiAgICB0aGlzLnRlY2huaXF1ZXNbdGVjaG5pcXVlSW5kZXhdLnJlbmRlcihzY2VuZSwgb2JqZWN0LCB0ZWNobmlxdWVDb3VudCwgdGVjaG5pcXVlSW5kZXgsIHRleHMpO1xuICB9XG5cbiAgcHVibGljIG5lZWRSZW5kZXIoc2NlbmU6IFNjZW5lLCBvYmplY3Q6IFNjZW5lT2JqZWN0LCB0ZWNobmlxdWVJbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmplY3QuR2VvbWV0cnkgIT09IFwidW5kZWZpbmVkXCIgJiYgb2JqZWN0Lkdlb21ldHJ5ICE9IG51bGw7XG4gIH1cblxuICBwdWJsaWMgZ2V0VGVjaG5pcXVlQ291bnQoc2NlbmU6IFNjZW5lKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fdGVjaG5pcXVlQ291bnQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0VGFyZ2V0KHRlY2huaXF1ZUluZGV4OiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnRlY2huaXF1ZXNbdGVjaG5pcXVlSW5kZXhdLlRhcmdldDtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlUlNNTChzb3VyY2U6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3BhcnNlZFJTTUwgPSAobmV3IERPTVBhcnNlcigpKS5wYXJzZUZyb21TdHJpbmcoc291cmNlLCBcInRleHQveG1sXCIpO1xuICAgIGNvbnN0IHN0YWdlVGFnID0gdGhpcy5fcGFyc2VkUlNNTC5xdWVyeVNlbGVjdG9yKFwicnNtbCA+IHN0YWdlXCIpO1xuICAgIGlmICghc3RhZ2VUYWcpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJTdGFnZSB0YWcgd2FzIG5vdCBmb3VuZCBpbiBSU01MXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9zdGFnZU5hbWUgPSBzdGFnZVRhZy5nZXRBdHRyaWJ1dGUoXCJuYW1lXCIpO1xuICAgIGNvbnN0IHRlY2huaXF1ZVRhZ3MgPSBzdGFnZVRhZy5xdWVyeVNlbGVjdG9yQWxsKFwidGVjaG5pcXVlXCIpO1xuICAgIHRoaXMuX3RlY2huaXF1ZUNvdW50ID0gdGVjaG5pcXVlVGFncy5sZW5ndGg7XG4gICAgdGhpcy50ZWNobmlxdWVzID0gbmV3IEFycmF5KHRoaXMuX3RlY2huaXF1ZUNvdW50KTtcbiAgICBmb3IgKGxldCB0ZWNobmlxdWVJbmRleCA9IDA7IHRlY2huaXF1ZUluZGV4IDwgdGhpcy5fdGVjaG5pcXVlQ291bnQ7IHRlY2huaXF1ZUluZGV4KyspIHtcbiAgICAgIHRoaXMudGVjaG5pcXVlc1t0ZWNobmlxdWVJbmRleF0gPSBuZXcgQmFzaWNUZWNobmlxdWUodGhpcywgdGVjaG5pcXVlVGFncy5pdGVtKHRlY2huaXF1ZUluZGV4KSwgdGVjaG5pcXVlSW5kZXgpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSU01MUmVuZGVyU3RhZ2U7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=