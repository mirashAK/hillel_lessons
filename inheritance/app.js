class HtmlElement {
    id = 'inputId';
    text = 'HtmlInput';
    template = '';
    container;
    
    constructor(params = {}) { //{text: 'My custom input'}
        if (params.text) this.text = params.text;
    }
    
    placeIn(container) {
        if (!this.container) {
            this.container = container;
        }
        this.container.innerHTML = this.render();
    }
    
    render() {
       return this.template
       .replace('{text}', this.text)
       .replace('{id}', this.id)
    }
    
    get value() {
        if (!this.container) return '';
        return this.container.querySelector(`#${this.id}`).value;
    }
    set value(val) {
        if (!this.container) return;
        this.text = val;
        this.container.innerHTML = this.render();
    }
}

class HtmlInput  extends HtmlElement {
    
    template = '<input type="text" id="{id}" value="{text}" />';
    
    constructor(params = {}) { //{text: 'My custom input'}
        super(params);
        this.text = 'input_' + this.text;
        this.id = 'input_' + Date.now();
    }
}

class HtmlColorInput extends HtmlInput {
    template = '<input type="text" id="{id}" value="{text}" style="border: 2px solid {color};" />';
    
    constructor(params = {}) { 
        super(params);
        this.color = params.color ? params.color : 'red';
    }
    
    render() {
       return this.template
       .replace('{text}', this.text)
       .replace('{id}', this.id)
       .replace('{color}', this.color)
    }
}

class HtmlTextarea  extends HtmlElement{
    
    template = '<textarea id="{id}" cols="10" rows="5" >{text}</textarea> ';
    
    constructor(params = {}) {
        super(params);
        this.id = 'textarea_' + Date.now();
        this.text = 'textarea_' + this.text;
    }
}

const init = function(){
    
    
    const container = document.getElementById('container');
    const buttons = document.getElementById('buttons').getElementsByTagName('button');

    const clickHandler = function(event) {
        console.log(`event: `, event);
        switch(event.target.dataset.type) {
            case 'text-input' : {
                const input = new HtmlInput({text: 'My custom input'});
                input.placeIn(container);
            } break;
            case 'text-area' : {
                const textarea = new HtmlTextarea({text: 'My custom textarea'});
                textarea.placeIn(container);
            } break;
            case 'text-color-input' : {
                const input = new HtmlColorInput({text: 'My bordered input ', color: 'red'});
                input.placeIn(container);
                console.log(`input.value: `, input.value );
                input.value = 'Setted New';
            } break;
        };
        
    }
    
    for (let button of buttons) {
        button.addEventListener('click',  clickHandler);
    }
    

}


if (document.readyState === 'loading') {  // Загрузка ещё не закончилась
  document.addEventListener('DOMContentLoaded', init);
} else {  // `DOMContentLoaded` Уже сработал
  init();
}
