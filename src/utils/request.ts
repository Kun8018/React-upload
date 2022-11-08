export const JudgePic = (Item: any) => {
    const random = Math.round(Math.random());

    console.log('random', random);
    return new Promise(function (resolve, reject) {
        let reader = new FileReader();

        reader.onload = function (val) {
            const src = val?.target?.result;
            setTimeout(() => {
                if(random === 1) resolve(src)
                resolve('failed')
            }, random * 2000);
        };
        reader.onerror = reject;

        if (!Item.type) {
            resolve(reader.readAsArrayBuffer(Item))
        } else {
            reader.readAsDataURL(Item);
        }
    });
}