function delay(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
}

export default delay;
