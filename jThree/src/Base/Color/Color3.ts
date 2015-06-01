import JThreeObject = require("../JThreeObject");
import Vector3 = require("../../Math/Vector3");
import Color4 = require('./Color4');
declare function require(string): { [key: string]: string };

class Color3 extends JThreeObject {
    constructor(r: number, g: number, b: number) {
        super();
        this.r = r;
        this.g = g;
        this.b = b;
    }

    private r: number;
    private g: number;
    private b: number;

    get R(): number {
        return this.r;
    }

    get G(): number {
        return this.g;
    }

    get B(): number {
        return this.b;
    }

    public static FromColor4(col:Color4):Color3
    {
      return new Color3(col.R,col.G,col.B);
    }
    public toVector():Vector3
    {
      return new Vector3(this.R,this.G,this.B);
    }

    static colorTable: { [key: string]: string } = require('static/color.json');
    ///Color parser for css like syntax
    static internalParse(color: string, isFirst: boolean): Color3 {
        if (isFirst && Color4.colorTable[color]) {
            var col=Color4.internalParse(Color4.colorTable[color], false);
            return Color3.FromColor4(col);
        }
        if (isFirst) {
            var m = color.match(/^#([0-9a-f]{3})$/i);
            //#fff
            if (m) {
                var s = m[1];
                return new Color3(
                    parseInt(s.charAt(0), 16) / 0xf,
                    parseInt(s.charAt(1), 16) / 0xf,
                    parseInt(s.charAt(2), 16) / 0xf
                    );
            }
        }

        //#ffffff
        m = color.match(/^#([0-9a-f]{6})$/i);
        if (m) {
            var s = m[1];
            return new Color3(
                parseInt(s.substr(0, 2), 16) / 0xff,
                parseInt(s.substr(2, 2), 16) / 0xff,
                parseInt(s.substr(4, 2), 16) / 0xff
                );
        }

        var n = color.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
        if (n && isFirst) {
            return new Color3(parseInt(n[1]) / 0xff, parseInt(n[2]) / 0xff, parseInt(n[3]) / 0xff);
        }
        throw new Error("color parse failed.");
    }

    static parseColor(color: string): Color3 {
        return Color3.internalParse(color, true);
    }

    toString(): string {
        var st ="#";
        st += Math.round(this.R * 0xff).toString(16).toUpperCase();
        st += Math.round(this.G * 0xff).toString(16).toUpperCase();
        st += Math.round(this.B * 0xff).toString(16).toUpperCase();
        return "Color3({0},{1},{2}):{4}".format(this.R, this.G, this.B, st);
    }
}


export =Color3;