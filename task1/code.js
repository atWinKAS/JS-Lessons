/**
 * Created by and on 11.02.2015.
 */

(function () {

    function isEqual(object1, object2) {

        if (typeof(object1) == 'object' && typeof(object2) == 'object') {

            var props1 = Object.getOwnPropertyNames(object1);
            var props2 = Object.getOwnPropertyNames(object2);

            if (props1.length != props2.length) {
                return false;
            }

            for (var i = 0; i < props1.length; i++) {
                var propName = props1[i];

                if (typeof(object1[propName]) !== typeof(object2[propName])) {
                    return false;
                }

                if (typeof(object1[propName] == 'object')) {
                    var result = isEqual(object1[propName], object2[propName]);
                    if (result == false) {
                        return false;
                    }

                } else {
                    if (object1[propName] !== object2[propName]) {
                        return false;
                    }
                }
            }
        } else {
            if (object1 !== object2) {
                return false;
            }
        }

        return true;
    };


    console.log('home work for lesson 1');

    console.log(isEqual(true, true) === true);
    console.log(isEqual(false, false) === true);
    console.log(isEqual(true, false) === false);

    console.log(isEqual(1, 2) === false);
    console.log(isEqual(1, 1) === true);

    console.log(isEqual(isEqual({a: 2}, {a: 2}), true));
    console.log(isEqual(isEqual({a: 2}, {a: "2"}), false));
    console.log(isEqual(isEqual({a: 2, b: [1, 2]}, {a: 2, b: [1, 2]}), true));
    console.log(isEqual(isEqual({a: 2, b: {k: [1, 2]}}, {a: 2, k: [1, 2]}), false));

    console.log(isEqual(isEqual({a: 'hello'}, {a: 'hello'}), true));
    console.log(isEqual(isEqual({a: 'hello'}, {a: 'world'}), false));

    console.log(isEqual(isEqual([1, 2], [1, 2]), true));
    console.log(isEqual(isEqual([1, 2], [1, 3]), false));
    console.log(isEqual(isEqual([1, 2], [1, 2, 3]), false));

    console.log(isEqual(isEqual('aaa', 'aaa'), true));
    console.log(isEqual(isEqual('aaa', 'aaab'), false));
    console.log(isEqual(isEqual('a', 'A'), false));

    console.log(isEqual(isEqual(1, 'aaab'), false));

    console.log(isEqual(isEqual({}, {}), true));

    console.log(isEqual(isEqual({}, {a: 1}), false));

    console.log(isEqual(isEqual(undefined, undefined), true));
    console.log(isEqual(isEqual(NaN, NaN), false));
    console.log(isEqual(isEqual(NaN, undefined), false));


    function clone(obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }

        var temp = obj.constructor();
        for (var key in obj) {
            temp[key] = clone(obj[key]);
        }

        return temp;
    }

    var testObject = {
        p1: "AAA",
        p2: 10,
        p3: {
            pp1: 100,
            pp2: [1,2,3]
        }
    };

    console.log(isEqual(isEqual(testObject, clone(testObject)), true));
    console.log(testObject);
    console.log(clone(testObject));

})();