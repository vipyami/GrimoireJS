import JThreeContext from "../../../JThreeContext";
import ContextComponents from "../../../ContextComponents";
import MatrixArray from "../../../Math/MatrixArray";
import VectorArray from "../../../Math/VectorArray";
import Matrix from "../../../Math/Matrix";
import Vector2 from "../../../Math/Vector2";
import Vector3 from "../../../Math/Vector3";
import Vector4 from "../../../Math/Vector4";
import isArray from "lodash.isarray";
import Q from "q";
class DefaultValuePreProcessor {
    static preprocess(uniforms) {
        const tasks = [];
        for (let variableName in uniforms) {
            const uniform = uniforms[variableName];
            if (!uniform.isArray) {
                switch (uniform.variableType) {
                    case "float":
                        tasks.push(DefaultValuePreProcessor._syncPromise(() => { DefaultValuePreProcessor._forFloat(uniform); }));
                        break;
                    case "vec2":
                        tasks.push(DefaultValuePreProcessor._syncPromise(() => { DefaultValuePreProcessor._forVec2(uniform); }));
                        break;
                    case "vec3":
                        tasks.push(DefaultValuePreProcessor._syncPromise(() => { DefaultValuePreProcessor._forVec3(uniform); }));
                        break;
                    case "vec4":
                        tasks.push(DefaultValuePreProcessor._syncPromise(() => { DefaultValuePreProcessor._forVec4(uniform); }));
                        break;
                    case "mat4":
                        tasks.push(DefaultValuePreProcessor._syncPromise(() => { DefaultValuePreProcessor._forMat4(uniform); }));
                        break;
                    case "sampler2D":
                        tasks.push(DefaultValuePreProcessor._forSampler2D(uniform));
                }
            }
            else {
                // When this uniform is array.
                switch (uniform.variableType) {
                    case "float":
                        tasks.push(DefaultValuePreProcessor._syncPromise(() => { DefaultValuePreProcessor._forFloatArray(uniform); }));
                        break;
                    case "vec2":
                        tasks.push(DefaultValuePreProcessor._syncPromise(() => { DefaultValuePreProcessor._forVectorarray(2, uniform); }));
                        break;
                    case "vec3":
                        tasks.push(DefaultValuePreProcessor._syncPromise(() => { DefaultValuePreProcessor._forVectorarray(3, uniform); }));
                        break;
                    case "vec4":
                        tasks.push(DefaultValuePreProcessor._syncPromise(() => { DefaultValuePreProcessor._forVectorarray(4, uniform); }));
                        break;
                    case "mat4":
                        tasks.push(DefaultValuePreProcessor._syncPromise(() => { DefaultValuePreProcessor._forMat4Array(uniform); }));
                        break;
                }
            }
        }
        return Q.all(tasks);
    }
    static _syncPromise(fn) {
        const defer = Q.defer();
        process.nextTick(() => {
            try {
                fn();
            }
            catch (e) {
                defer.reject(e);
            }
            defer.resolve(null);
        });
        return defer.promise;
    }
    static _forFloat(uniform) {
        if (!uniform.variableAnnotation.default) {
            uniform.variableAnnotation.default = 0;
        }
    }
    static _forFloatArray(uniform) {
        const defaultArray = uniform.variableAnnotation.default;
        if (defaultArray) {
            if (defaultArray.length !== uniform.arrayLength) {
                throw new Error("specified array length is unmatch!");
            }
            uniform.variableAnnotation.default = defaultArray;
        }
        else {
            uniform.variableAnnotation.default = new Array(uniform.arrayLength);
            for (let i = 0; i < uniform.arrayLength; i++) {
                uniform.variableAnnotation.default[i] = 0; // [0,0,0.....0,0] will be used as default
            }
        }
    }
    static _forVectorarray(dimension, uniform) {
        const defaultArray = VectorArray.zeroVectorArray(dimension, uniform.arrayLength);
        const defaultValue = uniform.variableAnnotation.default;
        if (defaultArray) {
            if (isArray(defaultValue)) {
                if (isArray(defaultValue[0])) {
                    for (let i = 0; i < defaultValue.length; i++) {
                        defaultArray.setRawArray(i, defaultValue[i]);
                    }
                }
                else {
                    for (let i = 0; i < defaultValue.length; i++) {
                        defaultArray.rawElements[i] = defaultValue[i];
                    }
                }
            }
            else {
                throw new Error(`Unknown default value '${defaultValue}' was specified for variable '${uniform.variableType}[] ${uniform.variableName}'`);
            }
        }
        uniform.variableAnnotation.default = defaultArray;
    }
    static _forVec2(uniform) {
        const defaultValue = uniform.variableAnnotation.default;
        const annotations = uniform.variableAnnotation;
        if (defaultValue) {
            if (Array.isArray(defaultValue)) {
                annotations.default = new Vector2(defaultValue[0], defaultValue[1]); // parse array as vector
            }
            else if (typeof defaultValue === "string") {
                annotations.default = Vector2.parse(defaultValue); // parse string representation as vector
            }
            else {
                throw new Error(`Unknown default value '${defaultValue}' was specified for variable '${uniform.variableType} ${uniform.variableName}'`);
            }
        }
        else {
            annotations.default = new Vector2(0, 0); // use (0,0) as default when the default annotation was not specified
        }
    }
    static _forVec3(uniform) {
        const defaultValue = uniform.variableAnnotation.default;
        const annotations = uniform.variableAnnotation;
        if (defaultValue) {
            if (Array.isArray(defaultValue)) {
                annotations.default = new Vector3(defaultValue[0], defaultValue[1], defaultValue[2]); // parse array as vector
            }
            else if (typeof defaultValue === "string") {
                annotations.default = Vector3.parse(defaultValue); // parse string representation as vector
            }
            else {
                throw new Error(`Unknown default value '${defaultValue}' was specified for variable '${uniform.variableType} ${uniform.variableName}'`);
            }
        }
        else {
            annotations.default = new Vector3(0, 0, 0); // use (0,0,0) as default when the default annotation was not specified
        }
    }
    static _forVec4(uniform) {
        const defaultValue = uniform.variableAnnotation.default;
        const annotations = uniform.variableAnnotation;
        if (defaultValue) {
            if (Array.isArray(defaultValue)) {
                annotations.default = new Vector4(defaultValue[0], defaultValue[1], defaultValue[2], defaultValue[3]); // parse array as vector
            }
            else if (typeof defaultValue === "string") {
                annotations.default = Vector4.parse(defaultValue); // parse string representation as vector
            }
            else {
                throw new Error(`Unknown default value '${defaultValue}' was specified for variable '${uniform.variableType} ${uniform.variableName}'`);
            }
        }
        else {
            annotations.default = new Vector4(0, 0, 0, 0); // use (0,0,0,0) as default when the default annotation was not specified
        }
    }
    static _forMat4(uniform) {
        const defaultValue = uniform.variableAnnotation.default;
        const annotations = uniform.variableAnnotation;
        if (defaultValue) {
            if (Array.isArray(defaultValue)) {
                if (defaultValue.length !== 16) {
                    throw new Error(`Default value for mat4 must have 16 elements`);
                }
                annotations.default = Matrix.fromElements.apply(Matrix, defaultValue);
            }
            else {
                throw new Error(`Unknown default value '${defaultValue}' was specified for variable '${uniform.variableType} ${uniform.variableName}'`);
            }
        }
        else {
            annotations.default = Matrix.identity();
        }
    }
    static _forMat4Array(uniform) {
        const defaultValue = uniform.variableAnnotation.default;
        uniform.variableAnnotation.default = MatrixArray.getIdentityMatrixArray(uniform.arrayLength);
        if (defaultValue) {
            if (isArray(defaultValue)) {
                for (let i = 0; i < defaultValue.length; i++) {
                    uniform.variableAnnotation.default.rawElements[i] = defaultValue[i];
                }
            }
        }
    }
    static _forSampler2D(uniform) {
        const defaultValue = uniform.variableAnnotation.default;
        if (defaultValue) {
            return DefaultValuePreProcessor._resourceManager.loadTexture(defaultValue).then((texture) => {
                uniform.variableAnnotation.default = texture;
            });
        }
        else {
            return DefaultValuePreProcessor._syncPromise(() => {
                uniform.variableAnnotation.default = null;
            });
        }
    }
    static get _resourceManager() {
        return JThreeContext.getContextComponent(ContextComponents.ResourceManager);
    }
}
export default DefaultValuePreProcessor;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvcmUvTWF0ZXJpYWxzL0Jhc2UvRGVmYXVsdFZhbHVlUHJlUHJvY2Vzc29yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJPQUNPLGFBQWEsTUFBTSx3QkFBd0I7T0FDM0MsaUJBQWlCLE1BQU0sNEJBQTRCO09BQ25ELFdBQVcsTUFBTSwyQkFBMkI7T0FDNUMsV0FBVyxNQUFNLDJCQUEyQjtPQUM1QyxNQUFNLE1BQU0sc0JBQXNCO09BQ2xDLE9BQU8sTUFBTSx1QkFBdUI7T0FDcEMsT0FBTyxNQUFNLHVCQUF1QjtPQUNwQyxPQUFPLE1BQU0sdUJBQXVCO09BRXBDLE9BQU8sTUFBTSxnQkFBZ0I7T0FDN0IsQ0FBQyxNQUFNLEdBQUc7QUFDakI7SUFDRSxPQUFjLFVBQVUsQ0FBQyxRQUFrRDtRQUN6RSxNQUFNLEtBQUssR0FBdUIsRUFBRSxDQUFDO1FBQ3JDLEdBQUcsQ0FBQyxDQUFDLElBQUksWUFBWSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDbEMsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3ZDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO29CQUM3QixLQUFLLE9BQU87d0JBQ1YsS0FBSyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxZQUFZLENBQUMsUUFBUSx3QkFBd0IsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMxRyxLQUFLLENBQUM7b0JBQ1IsS0FBSyxNQUFNO3dCQUNULEtBQUssQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsWUFBWSxDQUFDLFFBQVEsd0JBQXdCLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDekcsS0FBSyxDQUFDO29C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Q0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTztnQkFDdEYsT0FBTyxDQUFDLGtCQUFrQixDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDL0MsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsd0JBQXdCLENBQUMsWUFBWSxDQUFDO2dCQUMzQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUM1QyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7SUFDSCxDQUFDO0lBRUQsV0FBbUIsZ0JBQWdCO1FBQ2pDLE1BQU0sQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQWtCLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQy9GLENBQUM7QUFDSCxDQUFDO0FBRUQsZUFBZSx3QkFBd0IsQ0FBQyIsImZpbGUiOiJDb3JlL01hdGVyaWFscy9CYXNlL0RlZmF1bHRWYWx1ZVByZVByb2Nlc3Nvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZXNvdXJjZU1hbmFnZXIgZnJvbSBcIi4uLy4uL1Jlc291cmNlTWFuYWdlclwiO1xuaW1wb3J0IEpUaHJlZUNvbnRleHQgZnJvbSBcIi4uLy4uLy4uL0pUaHJlZUNvbnRleHRcIjtcbmltcG9ydCBDb250ZXh0Q29tcG9uZW50cyBmcm9tIFwiLi4vLi4vLi4vQ29udGV4dENvbXBvbmVudHNcIjtcbmltcG9ydCBNYXRyaXhBcnJheSBmcm9tIFwiLi4vLi4vLi4vTWF0aC9NYXRyaXhBcnJheVwiO1xuaW1wb3J0IFZlY3RvckFycmF5IGZyb20gXCIuLi8uLi8uLi9NYXRoL1ZlY3RvckFycmF5XCI7XG5pbXBvcnQgTWF0cml4IGZyb20gXCIuLi8uLi8uLi9NYXRoL01hdHJpeFwiO1xuaW1wb3J0IFZlY3RvcjIgZnJvbSBcIi4uLy4uLy4uL01hdGgvVmVjdG9yMlwiO1xuaW1wb3J0IFZlY3RvcjMgZnJvbSBcIi4uLy4uLy4uL01hdGgvVmVjdG9yM1wiO1xuaW1wb3J0IFZlY3RvcjQgZnJvbSBcIi4uLy4uLy4uL01hdGgvVmVjdG9yNFwiO1xuaW1wb3J0IElWYXJpYWJsZURlc2NyaXB0aW9uIGZyb20gXCIuL0lWYXJpYWJsZURlc2NyaXB0aW9uXCI7XG5pbXBvcnQgaXNBcnJheSBmcm9tIFwibG9kYXNoLmlzYXJyYXlcIjtcbmltcG9ydCBRIGZyb20gXCJxXCI7XG5jbGFzcyBEZWZhdWx0VmFsdWVQcmVQcm9jZXNzb3Ige1xuICBwdWJsaWMgc3RhdGljIHByZXByb2Nlc3ModW5pZm9ybXM6IHsgW25hbWU6IHN0cmluZ106IElWYXJpYWJsZURlc2NyaXB0aW9uIH0pOiBRLklQcm9taXNlPHZvaWRbXT4ge1xuICAgIGNvbnN0IHRhc2tzOiBRLklQcm9taXNlPHZvaWQ+W10gPSBbXTtcbiAgICBmb3IgKGxldCB2YXJpYWJsZU5hbWUgaW4gdW5pZm9ybXMpIHtcbiAgICAgIGNvbnN0IHVuaWZvcm0gPSB1bmlmb3Jtc1t2YXJpYWJsZU5hbWVdO1xuICAgICAgaWYgKCF1bmlmb3JtLmlzQXJyYXkpIHsgLy8gV2hlbiB0aGlzIHVuaWZvcm0gaXMgbm90IGFycmF5ICwganVzdCBhIGVsZW1lbnQuXG4gICAgICAgIHN3aXRjaCAodW5pZm9ybS52YXJpYWJsZVR5cGUpIHtcbiAgICAgICAgICBjYXNlIFwiZmxvYXRcIjpcbiAgICAgICAgICAgIHRhc2tzLnB1c2goRGVmYXVsdFZhbHVlUHJlUHJvY2Vzc29yLl9zeW5jUHJvbWlzZSgoKSA9PiB7IERlZmF1bHRWYWx1ZVByZVByb2Nlc3Nvci5fZm9yRmxvYXQodW5pZm9ybSk7IH0pKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgXCJ2ZWMyXCI6XG4gICAgICAgICAgICB0YXNrcy5wdXNoKERlZmF1bHRWYWx1ZVByZVByb2Nlc3Nvci5fc3luY1Byb21pc2UoKCkgPT4geyBEZWZhdWx0VmFsdWVQcmVQcm9jZXNzb3IuX2ZvclZlYzIodW5pZm9ybSk7IH0pKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgXCJ2ZWMzXCI6XG4gICAgICAgICAgICB0YXNrcy5wdXNoKERlZmF1bHRWYWx1ZVByZVByb2Nlc3Nvci5fc3luY1Byb21pc2UoKCkgPT4geyBEZWZhdWx0VmFsdWVQcmVQcm9jZXNzb3IuX2ZvclZlYzModW5pZm9ybSk7IH0pKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgXCJ2ZWM0XCI6XG4gICAgICAgICAgICB0YXNrcy5wdXNoKERlZmF1bHRWYWx1ZVByZVByb2Nlc3Nvci5fc3luY1Byb21pc2UoKCkgPT4geyBEZWZhdWx0VmFsdWVQcmVQcm9jZXNzb3IuX2ZvclZlYzQodW5pZm9ybSk7IH0pKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgXCJtYXQ0XCI6XG4gICAgICAgICAgICB0YXNrcy5wdXNoKERlZmF1bHRWYWx1ZVByZVByb2Nlc3Nvci5fc3luY1Byb21pc2UoKCkgPT4geyBEZWZhdWx0VmFsdWVQcmVQcm9jZXNzb3IuX2Zvck1hdDQodW5pZm9ybSk7IH0pKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgXCJzYW1wbGVyMkRcIjpcbiAgICAgICAgICAgIHRhc2tzLnB1c2goRGVmYXVsdFZhbHVlUHJlUHJvY2Vzc29yLl9mb3JTYW1wbGVyMkQodW5pZm9ybSkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBXaGVuIHRoaXMgdW5pZm9ybSBpcyBhcnJheS5cbiAgICAgICAgc3dpdGNoICh1bmlmb3JtLnZhcmlhYmxlVHlwZSkge1xuICAgICAgICAgIGNhc2UgXCJmbG9hdFwiOlxuICAgICAgICAgICAgdGFza3MucHVzaChEZWZhdWx0VmFsdWVQcmVQcm9jZXNzb3IuX3N5bmNQcm9taXNlKCgpID0+IHsgRGVmYXVsdFZhbHVlUHJlUHJvY2Vzc29yLl9mb3JGbG9hdEFycmF5KHVuaWZvcm0pOyB9KSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFwidmVjMlwiOlxuICAgICAgICAgICAgdGFza3MucHVzaChEZWZhdWx0VmFsdWVQcmVQcm9jZXNzb3IuX3N5bmNQcm9taXNlKCgpID0+IHsgRGVmYXVsdFZhbHVlUHJlUHJvY2Vzc29yLl9mb3JWZWN0b3JhcnJheSgyLCB1bmlmb3JtKTsgfSkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBcInZlYzNcIjpcbiAgICAgICAgICAgIHRhc2tzLnB1c2goRGVmYXVsdFZhbHVlUHJlUHJvY2Vzc29yLl9zeW5jUHJvbWlzZSgoKSA9PiB7IERlZmF1bHRWYWx1ZVByZVByb2Nlc3Nvci5fZm9yVmVjdG9yYXJyYXkoMywgdW5pZm9ybSk7IH0pKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgXCJ2ZWM0XCI6XG4gICAgICAgICAgICB0YXNrcy5wdXNoKERlZmF1bHRWYWx1ZVByZVByb2Nlc3Nvci5fc3luY1Byb21pc2UoKCkgPT4geyBEZWZhdWx0VmFsdWVQcmVQcm9jZXNzb3IuX2ZvclZlY3RvcmFycmF5KDQsIHVuaWZvcm0pOyB9KSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFwibWF0NFwiOlxuICAgICAgICAgICAgdGFza3MucHVzaChEZWZhdWx0VmFsdWVQcmVQcm9jZXNzb3IuX3N5bmNQcm9taXNlKCgpID0+IHsgRGVmYXVsdFZhbHVlUHJlUHJvY2Vzc29yLl9mb3JNYXQ0QXJyYXkodW5pZm9ybSk7IH0pKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBRLmFsbDx2b2lkPih0YXNrcyk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBfc3luY1Byb21pc2UoZm46IGFueSk6IFEuSVByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGRlZmVyID0gUS5kZWZlcjx2b2lkPigpO1xuICAgIHByb2Nlc3MubmV4dFRpY2soKCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZm4oKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgZGVmZXIucmVqZWN0KGUpO1xuICAgICAgfVxuICAgICAgZGVmZXIucmVzb2x2ZShudWxsKTtcbiAgICB9KTtcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIF9mb3JGbG9hdCh1bmlmb3JtOiBJVmFyaWFibGVEZXNjcmlwdGlvbik6IHZvaWQge1xuICAgIGlmICghdW5pZm9ybS52YXJpYWJsZUFubm90YXRpb24uZGVmYXVsdCkge1xuICAgICAgdW5pZm9ybS52YXJpYWJsZUFubm90YXRpb24uZGVmYXVsdCA9IDA7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgX2ZvckZsb2F0QXJyYXkodW5pZm9ybTogSVZhcmlhYmxlRGVzY3JpcHRpb24pOiB2b2lkIHtcbiAgICBjb25zdCBkZWZhdWx0QXJyYXkgPSB1bmlmb3JtLnZhcmlhYmxlQW5ub3RhdGlvbi5kZWZhdWx0O1xuICAgIGlmIChkZWZhdWx0QXJyYXkpIHtcbiAgICAgIGlmIChkZWZhdWx0QXJyYXkubGVuZ3RoICE9PSB1bmlmb3JtLmFycmF5TGVuZ3RoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcInNwZWNpZmllZCBhcnJheSBsZW5ndGggaXMgdW5tYXRjaCFcIik7XG4gICAgICB9XG4gICAgICB1bmlmb3JtLnZhcmlhYmxlQW5ub3RhdGlvbi5kZWZhdWx0ID0gZGVmYXVsdEFycmF5O1xuICAgIH0gZWxzZSB7XG4gICAgICB1bmlmb3JtLnZhcmlhYmxlQW5ub3RhdGlvbi5kZWZhdWx0ID0gbmV3IEFycmF5KHVuaWZvcm0uYXJyYXlMZW5ndGgpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB1bmlmb3JtLmFycmF5TGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdW5pZm9ybS52YXJpYWJsZUFubm90YXRpb24uZGVmYXVsdFtpXSA9IDA7IC8vIFswLDAsMC4uLi4uMCwwXSB3aWxsIGJlIHVzZWQgYXMgZGVmYXVsdFxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIF9mb3JWZWN0b3JhcnJheShkaW1lbnNpb246IG51bWJlciwgdW5pZm9ybTogSVZhcmlhYmxlRGVzY3JpcHRpb24pOiB2b2lkIHtcbiAgICBjb25zdCBkZWZhdWx0QXJyYXkgPSBWZWN0b3JBcnJheS56ZXJvVmVjdG9yQXJyYXkoZGltZW5zaW9uLCB1bmlmb3JtLmFycmF5TGVuZ3RoKTtcbiAgICBjb25zdCBkZWZhdWx0VmFsdWUgPSB1bmlmb3JtLnZhcmlhYmxlQW5ub3RhdGlvbi5kZWZhdWx0O1xuICAgIGlmIChkZWZhdWx0QXJyYXkpIHtcbiAgICAgIGlmIChpc0FycmF5KGRlZmF1bHRWYWx1ZSkpIHtcbiAgICAgICAgaWYgKGlzQXJyYXkoZGVmYXVsdFZhbHVlWzBdKSkge1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGVmYXVsdFZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBkZWZhdWx0QXJyYXkuc2V0UmF3QXJyYXkoaSwgZGVmYXVsdFZhbHVlW2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZWZhdWx0VmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGRlZmF1bHRBcnJheS5yYXdFbGVtZW50c1tpXSA9IGRlZmF1bHRWYWx1ZVtpXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBkZWZhdWx0IHZhbHVlICcke2RlZmF1bHRWYWx1ZX0nIHdhcyBzcGVjaWZpZWQgZm9yIHZhcmlhYmxlICcke3VuaWZvcm0udmFyaWFibGVUeXBlfVtdICR7dW5pZm9ybS52YXJpYWJsZU5hbWV9J2ApO1xuICAgICAgfVxuICAgIH1cbiAgICB1bmlmb3JtLnZhcmlhYmxlQW5ub3RhdGlvbi5kZWZhdWx0ID0gZGVmYXVsdEFycmF5O1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgX2ZvclZlYzIodW5pZm9ybTogSVZhcmlhYmxlRGVzY3JpcHRpb24pOiB2b2lkIHtcbiAgICBjb25zdCBkZWZhdWx0VmFsdWUgPSB1bmlmb3JtLnZhcmlhYmxlQW5ub3RhdGlvbi5kZWZhdWx0O1xuICAgIGNvbnN0IGFubm90YXRpb25zID0gdW5pZm9ybS52YXJpYWJsZUFubm90YXRpb247XG4gICAgaWYgKGRlZmF1bHRWYWx1ZSkge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGVmYXVsdFZhbHVlKSkge1xuICAgICAgICBhbm5vdGF0aW9ucy5kZWZhdWx0ID0gbmV3IFZlY3RvcjIoZGVmYXVsdFZhbHVlWzBdLCBkZWZhdWx0VmFsdWVbMV0pOyAvLyBwYXJzZSBhcnJheSBhcyB2ZWN0b3JcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGRlZmF1bHRWYWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBhbm5vdGF0aW9ucy5kZWZhdWx0ID0gVmVjdG9yMi5wYXJzZShkZWZhdWx0VmFsdWUpOyAvLyBwYXJzZSBzdHJpbmcgcmVwcmVzZW50YXRpb24gYXMgdmVjdG9yXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gZGVmYXVsdCB2YWx1ZSAnJHtkZWZhdWx0VmFsdWV9JyB3YXMgc3BlY2lmaWVkIGZvciB2YXJpYWJsZSAnJHt1bmlmb3JtLnZhcmlhYmxlVHlwZX0gJHt1bmlmb3JtLnZhcmlhYmxlTmFtZX0nYCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGFubm90YXRpb25zLmRlZmF1bHQgPSBuZXcgVmVjdG9yMigwLCAwKTsgLy8gdXNlICgwLDApIGFzIGRlZmF1bHQgd2hlbiB0aGUgZGVmYXVsdCBhbm5vdGF0aW9uIHdhcyBub3Qgc3BlY2lmaWVkXG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgX2ZvclZlYzModW5pZm9ybTogSVZhcmlhYmxlRGVzY3JpcHRpb24pOiB2b2lkIHtcbiAgICBjb25zdCBkZWZhdWx0VmFsdWUgPSB1bmlmb3JtLnZhcmlhYmxlQW5ub3RhdGlvbi5kZWZhdWx0O1xuICAgIGNvbnN0IGFubm90YXRpb25zID0gdW5pZm9ybS52YXJpYWJsZUFubm90YXRpb247XG4gICAgaWYgKGRlZmF1bHRWYWx1ZSkge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGVmYXVsdFZhbHVlKSkge1xuICAgICAgICBhbm5vdGF0aW9ucy5kZWZhdWx0ID0gbmV3IFZlY3RvcjMoZGVmYXVsdFZhbHVlWzBdLCBkZWZhdWx0VmFsdWVbMV0sIGRlZmF1bHRWYWx1ZVsyXSk7IC8vIHBhcnNlIGFycmF5IGFzIHZlY3RvclxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZGVmYXVsdFZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGFubm90YXRpb25zLmRlZmF1bHQgPSBWZWN0b3IzLnBhcnNlKGRlZmF1bHRWYWx1ZSk7IC8vIHBhcnNlIHN0cmluZyByZXByZXNlbnRhdGlvbiBhcyB2ZWN0b3JcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBkZWZhdWx0IHZhbHVlICcke2RlZmF1bHRWYWx1ZX0nIHdhcyBzcGVjaWZpZWQgZm9yIHZhcmlhYmxlICcke3VuaWZvcm0udmFyaWFibGVUeXBlfSAke3VuaWZvcm0udmFyaWFibGVOYW1lfSdgKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgYW5ub3RhdGlvbnMuZGVmYXVsdCA9IG5ldyBWZWN0b3IzKDAsIDAsIDApOyAvLyB1c2UgKDAsMCwwKSBhcyBkZWZhdWx0IHdoZW4gdGhlIGRlZmF1bHQgYW5ub3RhdGlvbiB3YXMgbm90IHNwZWNpZmllZFxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIF9mb3JWZWM0KHVuaWZvcm06IElWYXJpYWJsZURlc2NyaXB0aW9uKTogdm9pZCB7XG4gICAgY29uc3QgZGVmYXVsdFZhbHVlID0gdW5pZm9ybS52YXJpYWJsZUFubm90YXRpb24uZGVmYXVsdDtcbiAgICBjb25zdCBhbm5vdGF0aW9ucyA9IHVuaWZvcm0udmFyaWFibGVBbm5vdGF0aW9uO1xuICAgIGlmIChkZWZhdWx0VmFsdWUpIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGRlZmF1bHRWYWx1ZSkpIHtcbiAgICAgICAgYW5ub3RhdGlvbnMuZGVmYXVsdCA9IG5ldyBWZWN0b3I0KGRlZmF1bHRWYWx1ZVswXSwgZGVmYXVsdFZhbHVlWzFdLCBkZWZhdWx0VmFsdWVbMl0sIGRlZmF1bHRWYWx1ZVszXSk7IC8vIHBhcnNlIGFycmF5IGFzIHZlY3RvclxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZGVmYXVsdFZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGFubm90YXRpb25zLmRlZmF1bHQgPSBWZWN0b3I0LnBhcnNlKGRlZmF1bHRWYWx1ZSk7IC8vIHBhcnNlIHN0cmluZyByZXByZXNlbnRhdGlvbiBhcyB2ZWN0b3JcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBkZWZhdWx0IHZhbHVlICcke2RlZmF1bHRWYWx1ZX0nIHdhcyBzcGVjaWZpZWQgZm9yIHZhcmlhYmxlICcke3VuaWZvcm0udmFyaWFibGVUeXBlfSAke3VuaWZvcm0udmFyaWFibGVOYW1lfSdgKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgYW5ub3RhdGlvbnMuZGVmYXVsdCA9IG5ldyBWZWN0b3I0KDAsIDAsIDAsIDApOyAvLyB1c2UgKDAsMCwwLDApIGFzIGRlZmF1bHQgd2hlbiB0aGUgZGVmYXVsdCBhbm5vdGF0aW9uIHdhcyBub3Qgc3BlY2lmaWVkXG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgX2Zvck1hdDQodW5pZm9ybTogSVZhcmlhYmxlRGVzY3JpcHRpb24pOiB2b2lkIHtcbiAgICBjb25zdCBkZWZhdWx0VmFsdWUgPSB1bmlmb3JtLnZhcmlhYmxlQW5ub3RhdGlvbi5kZWZhdWx0O1xuICAgIGNvbnN0IGFubm90YXRpb25zID0gdW5pZm9ybS52YXJpYWJsZUFubm90YXRpb247XG4gICAgaWYgKGRlZmF1bHRWYWx1ZSkge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGVmYXVsdFZhbHVlKSkge1xuICAgICAgICBpZiAoZGVmYXVsdFZhbHVlLmxlbmd0aCAhPT0gMTYpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYERlZmF1bHQgdmFsdWUgZm9yIG1hdDQgbXVzdCBoYXZlIDE2IGVsZW1lbnRzYCk7XG4gICAgICAgIH1cbiAgICAgICAgYW5ub3RhdGlvbnMuZGVmYXVsdCA9IE1hdHJpeC5mcm9tRWxlbWVudHMuYXBwbHkoTWF0cml4LCBkZWZhdWx0VmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIGRlZmF1bHQgdmFsdWUgJyR7ZGVmYXVsdFZhbHVlfScgd2FzIHNwZWNpZmllZCBmb3IgdmFyaWFibGUgJyR7dW5pZm9ybS52YXJpYWJsZVR5cGV9ICR7dW5pZm9ybS52YXJpYWJsZU5hbWV9J2ApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBhbm5vdGF0aW9ucy5kZWZhdWx0ID0gTWF0cml4LmlkZW50aXR5KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgX2Zvck1hdDRBcnJheSh1bmlmb3JtOiBJVmFyaWFibGVEZXNjcmlwdGlvbik6IHZvaWQge1xuICAgIGNvbnN0IGRlZmF1bHRWYWx1ZSA9IHVuaWZvcm0udmFyaWFibGVBbm5vdGF0aW9uLmRlZmF1bHQ7XG4gICAgdW5pZm9ybS52YXJpYWJsZUFubm90YXRpb24uZGVmYXVsdCA9IE1hdHJpeEFycmF5LmdldElkZW50aXR5TWF0cml4QXJyYXkodW5pZm9ybS5hcnJheUxlbmd0aCk7XG4gICAgaWYgKGRlZmF1bHRWYWx1ZSkge1xuICAgICAgaWYgKGlzQXJyYXkoZGVmYXVsdFZhbHVlKSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRlZmF1bHRWYWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHVuaWZvcm0udmFyaWFibGVBbm5vdGF0aW9uLmRlZmF1bHQucmF3RWxlbWVudHNbaV0gPSBkZWZhdWx0VmFsdWVbaV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBfZm9yU2FtcGxlcjJEKHVuaWZvcm06IElWYXJpYWJsZURlc2NyaXB0aW9uKTogUS5JUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgZGVmYXVsdFZhbHVlID0gdW5pZm9ybS52YXJpYWJsZUFubm90YXRpb24uZGVmYXVsdDtcbiAgICBpZiAoZGVmYXVsdFZhbHVlKSB7XG4gICAgICByZXR1cm4gRGVmYXVsdFZhbHVlUHJlUHJvY2Vzc29yLl9yZXNvdXJjZU1hbmFnZXIubG9hZFRleHR1cmUoZGVmYXVsdFZhbHVlKS50aGVuKCh0ZXh0dXJlKSA9PiB7XG4gICAgICAgIHVuaWZvcm0udmFyaWFibGVBbm5vdGF0aW9uLmRlZmF1bHQgPSB0ZXh0dXJlO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBEZWZhdWx0VmFsdWVQcmVQcm9jZXNzb3IuX3N5bmNQcm9taXNlKCgpID0+IHtcbiAgICAgICAgdW5pZm9ybS52YXJpYWJsZUFubm90YXRpb24uZGVmYXVsdCA9IG51bGw7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBnZXQgX3Jlc291cmNlTWFuYWdlcigpOiBSZXNvdXJjZU1hbmFnZXIge1xuICAgIHJldHVybiBKVGhyZWVDb250ZXh0LmdldENvbnRleHRDb21wb25lbnQ8UmVzb3VyY2VNYW5hZ2VyPihDb250ZXh0Q29tcG9uZW50cy5SZXNvdXJjZU1hbmFnZXIpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERlZmF1bHRWYWx1ZVByZVByb2Nlc3NvcjtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==