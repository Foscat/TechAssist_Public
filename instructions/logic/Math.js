const Math = {
    twoArgs: function(a,b){
        mathObj ={
            sum: a+b,
            diff: a-b,
            times: a*b,
            arg1: a,
            arg2: b
        }
        return mathObj;
    }
}
export default Math;