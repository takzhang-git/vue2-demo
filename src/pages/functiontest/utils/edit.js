export function editFun(data){
    data.forEach((item) => {
        item.age++;
        item.skill = '打游戏';
    });
}