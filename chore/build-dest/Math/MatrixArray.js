import Matrix from "./Matrix";
class MatrixArray {
    constructor(length) {
        this.rawElements = new Float32Array(length * 16);
    }
    static getIdentityMatrixArray(length) {
        const matArray = new MatrixArray(length);
        for (let i = 0; i < length; i++) {
            for (let c = 0; c < 4; c++) {
                for (let r = 0; r < 4; r++) {
                    matArray.rawElements[i * 16 + 4 * c + r] = c === r ? 1 : 0;
                }
            }
        }
        return matArray;
    }
    getAt(index) {
        const firstIndex = index * 16;
        return new Matrix(this.rawElements.slice(firstIndex, firstIndex + 16));
    }
    setAt(index, matrix) {
        for (let i = 0; i < 16; i++) {
            this.rawElements[16 * index + i] = matrix.rawElements[i];
        }
    }
}
export default MatrixArray;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1hdGgvTWF0cml4QXJyYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ik9BQU8sTUFBTSxNQUFNLFVBQVU7QUFDN0I7SUFlRSxZQUFZLE1BQWM7UUFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLFlBQVksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQWRELE9BQWMsc0JBQXNCLENBQUMsTUFBYztRQUNqRCxNQUFNLFFBQVEsR0FBRyxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ2hDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQzNCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7b0JBQzNCLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDN0QsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBTU0sS0FBSyxDQUFDLEtBQWE7UUFDeEIsTUFBTSxVQUFVLEdBQUcsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUM5QixNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLFVBQVUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFTSxLQUFLLENBQUMsS0FBYSxFQUFFLE1BQWM7UUFDeEMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzRCxDQUFDO0lBQ0gsQ0FBQztBQUNILENBQUM7QUFFRCxlQUFlLFdBQVcsQ0FBQyIsImZpbGUiOiJNYXRoL01hdHJpeEFycmF5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1hdHJpeCBmcm9tIFwiLi9NYXRyaXhcIjtcbmNsYXNzIE1hdHJpeEFycmF5IHtcbiAgcHVibGljIHJhd0VsZW1lbnRzOiBGbG9hdDMyQXJyYXk7XG5cbiAgcHVibGljIHN0YXRpYyBnZXRJZGVudGl0eU1hdHJpeEFycmF5KGxlbmd0aDogbnVtYmVyKTogTWF0cml4QXJyYXkge1xuICAgIGNvbnN0IG1hdEFycmF5ID0gbmV3IE1hdHJpeEFycmF5KGxlbmd0aCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCA0OyBjKyspIHtcbiAgICAgICAgZm9yIChsZXQgciA9IDA7IHIgPCA0OyByKyspIHtcbiAgICAgICAgICBtYXRBcnJheS5yYXdFbGVtZW50c1tpICogMTYgKyA0ICogYyArIHJdID0gYyA9PT0gciA/IDEgOiAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtYXRBcnJheTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGxlbmd0aDogbnVtYmVyKSB7XG4gICAgdGhpcy5yYXdFbGVtZW50cyA9IG5ldyBGbG9hdDMyQXJyYXkobGVuZ3RoICogMTYpO1xuICB9XG5cbiAgcHVibGljIGdldEF0KGluZGV4OiBudW1iZXIpOiBNYXRyaXgge1xuICAgIGNvbnN0IGZpcnN0SW5kZXggPSBpbmRleCAqIDE2O1xuICAgIHJldHVybiBuZXcgTWF0cml4KHRoaXMucmF3RWxlbWVudHMuc2xpY2UoZmlyc3RJbmRleCwgZmlyc3RJbmRleCArIDE2KSk7XG4gIH1cblxuICBwdWJsaWMgc2V0QXQoaW5kZXg6IG51bWJlciwgbWF0cml4OiBNYXRyaXgpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE2OyBpKyspIHtcbiAgICAgIHRoaXMucmF3RWxlbWVudHNbMTYgKiBpbmRleCArIGldID0gbWF0cml4LnJhd0VsZW1lbnRzW2ldO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNYXRyaXhBcnJheTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==