﻿///<reference path="../../_references.ts"/>
///<reference path="../../def-test/qunit.d.ts"/>
QUnit.module("Matrix Test");
module jThreeTest {
    import Matrix = jThree.Matrix.Matrix;
    import Vector3 = jThree.Mathematics.Vector.Vector3;
    import Vector4 = jThree.Mathematics.Vector.Vector4;
    import VectorBase = jThree.Mathematics.Vector.VectorBase;

    function matEqual(actual: Matrix, expect: Matrix): void {
        QUnit.equal(Matrix.equal(actual, expect), true, "actual:\n{0}\n,expected:\n{1}\n".format(actual, expect));
    }

    function matNotEqaual(actual: Matrix, expect: Matrix) {
        QUnit.equal(Matrix.equal(actual, expect), false, "actual:\n{0}\n,expected:\n{1}\n".format(actual, expect));
    }

    function vec3Equal(actual: Vector3, expect: Vector3): void {
        QUnit.equal(Vector3.equal(actual, expect), true,"actual:\n{0},expected:\n{1}\n".format(actual,expect));
    }

    function vec4Equal(actual:Vector4,expect:Vector4) {
        QUnit.equal(Vector4.equal(actual, expect), true, "actual:\n{0},expected:\n{1}\n".format(actual, expect));
    }

        var m1: Matrix =Matrix.fromElements(
            1, 2, 3, 4,
            1, 2, 3, 4,
            1, 2, 3, 4,
            1, 2, 3, 4);

        var m2: Matrix = Matrix.fromElements(
            3, 5, 7, 9,
            3, 5, 7, 9,
            3, 5, 7, 9,
            3, 6, 8, 9
            );

        var v31: Vector3 = new Vector3(1, 2, 3);

        var v41:Vector4=new Vector4(1,2,3,4);


    QUnit.test("equalTest", () => {
        matEqual(m1, Matrix.fromElements(
            1, 2, 3, 4,
            1, 2, 3, 4,
            1, 2, 3, 4,
            1, 2, 3, 4
        ));
        matNotEqaual(m1, Matrix.fromElements(
            1, 2, 3, 4,
            1, 2, 3, 4,
            1, 2, 4, 4,
            1, 2, 3, 4
        ));
    });

    QUnit.test("addTest", () => {
        matEqual(Matrix.add(m1, m2),Matrix.fromElements(
            4, 7, 10, 13,
            4, 7, 10, 13,
            4, 7, 10, 13,
            4, 8, 11, 13
        ));
    });

    QUnit.test("subtractTest", () => {
        matEqual(Matrix.subtract(m1, m2), Matrix.fromElements(
            -2, -3, -4, -5,
            -2, -3, -4, -5,
            -2, -3, -4, -5,
            -2, -4, -5, -5
        ));
    });

    QUnit.test("scalarMultiplyTest", () => {
        matEqual(Matrix.scalarMultiply(2, m1), Matrix.fromElements(
            2, 4, 6, 8,
            2, 4, 6, 8,
            2, 4, 6, 8,
            2, 4, 6, 8
        ));
    });

    QUnit.test("nvertTest", () => {
        matEqual(Matrix.negate(m1), Matrix.fromElements(
            -1, -2, -3, -4,
            -1, -2, -3, -4,
            -1, -2, -3, -4,
            -1, -2, -3, -4
        ));
    });

    QUnit.test("transposeTest", () => {
        matEqual(Matrix.transpose(m1), Matrix.fromElements(
            1, 1, 1, 1,
            2, 2, 2, 2,
            3, 3, 3, 3,
            4, 4, 4, 4
        ));
    });

    QUnit.test("translateTest", () => {
        matEqual(Matrix.translate(new Vector3(1, 2, 3)), Matrix.fromElements(
            1, 0, 0, 1,
            0, 1, 0, 2,
            0, 0, 1, 3,
            0, 0, 0, 1
        ));
    });

    QUnit.test("transformPointTest", () => {
            vec3Equal(Matrix.transformPoint(m1, v31), new Vector3(18, 18, 18));
        }
    );

    QUnit.test("transformNormalTest", () => {
        vec3Equal(Matrix.transformNormal(m1, v31), new Vector3(14, 14, 14));
    });

    QUnit.test("transformTest", () => {
        vec4Equal(Matrix.transform(m1, v41), new Vector4(30, 30, 30, 30));
    });

    QUnit.test("determinant test",() => {
        QUnit.equal(Matrix.determinant(Matrix.translate(new Vector3(1,2,3))),1);
    });

    QUnit.test("look at test", () => {
        matEqual(Matrix.lookAt(new Vector3(0, 0, 0), new Vector3(0, 0, 1), new Vector3(0, 1, 0)), Matrix.identity());
        matEqual(Matrix.lookAt(new Vector3(0, 0, 0), new Vector3(0, 0, -1), new Vector3(0, 1, 0)), Matrix.fromElements(-1,0,0,0,0,1,0,0,0,0,-1,0,0,0,0,1));
    });


   /* QUnit.test("perspective test",() => {
        console.log("\n");
        var vpMat: Matrix = Matrix.lookAt(new Vector3(0, 0, -1), new Vector3(0, 0, 0), new Vector3(0, 1, 0));
        var projMat:Matrix= Matrix.perspective(45, 1, 0.1, 10);//.multiplyWith(vpMat);
        //console.log("viewMatix:\n" + vpMat + "\n");
        //console.log("perspective:\n" + projMat + "\n");
        //console.log("multiplied:\n" + Matrix.multiply(projMat, vpMat) + "\n");
        var multiplied: Matrix = Matrix.multiply(projMat, vpMat);
        var points: Vector3[] = [new Vector3(1, 0, 0), new Vector3(-1, 0, 0), new Vector3(0, 1, 0)];
        console.log("points...\n");
        for (var i = 0; i < 3; i++) {
            var v: Vector3 = points[i];
            var transformed: Vector3 = Matrix.transformPoint(multiplied, v);
            var logData: string = "source:" + v.toString();
            console.log(logData);
                console.log("⇒transformed:" + transformed.toString() + "\n");
            console.log(logData);
        }
    });*/
}