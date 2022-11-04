class HtmlElement {
    id = 'inpitId';
    text = 'HtmlElement';
    template = '<div id="{id}">{text}</div>';
    container;
    
    constructor(params = {}) {
        this.id = params.id ? params.id : this.id;
        this.text = params.text ? params.text : this.text;
        this.container = params.container || null;
    }
    
    render() {
        return this.template
        .replace('{id}', this.id)
        .replace('{text}', this.text);
    }
    
    placeIn() {
        if (!this.container) return false;
        this.container.innerHTML += this.render();
    }
    
}

class HtmInput extends HtmlElement {
    template = '<input type="text" id="{id}" value="{text}" />';
    
    constructor(params = {}) {
        super(params);
        this.placeIn();
    }
    
    get value() {
        if (!this.container) return '';
        return this.container.querySelector(`#${this.id}`).value;
    }
    
    set value(val) {
        this.container.querySelector(`#${this.id}`).value = val;
        this.text = val;
    }
    
}


const init = function(){
    
    const container = document.getElementById('container');
    const element = new HtmlElement({
        id: 'div-1',
        text: 'Inside DIV text',
        container: container
    });
    element.placeIn();
    const element2 = new HtmInput({
        id: 'input-1',
        text: 'Inside 222 text',
        container: container
    });
    
    
    element2.value = 'TEST_TEST';
    console.log(` element2.text: `, element2.text);
    
    
    document.getElementById('get-value')
    .addEventListener('click', ()=>{
        console.log(`element2.value: `, element2.value);
    })

}


if (document.readyState === 'loading') {  // Загрузка ещё не закончилась
  document.addEventListener('DOMContentLoaded', init);
} else {  // `DOMContentLoaded` Уже сработал
  init();
}
