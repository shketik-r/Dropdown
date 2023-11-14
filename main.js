class DropDownList {
  dropDown
  btn
  panel
  icon
  setting = {}
  constructor(dropDown, setting) {
    this.dropDown = dropDown;
    this.setting = setting
    this.#getElements();
    this.#click();
    if (this.setting.closeWindow === true) {
      this.#closeWindow()
    }
  }

  #getElements() {
    this.#getBtn();
    this.#getPanel();
    if (this.setting.icon) {
      this.#getIcon();
      console.log(this.icon);
    }
  }

  #getBtn() {
    return this.btn = this.dropDown.firstChild.nextElementSibling; //получить кнопки
  }
  #getPanel() {
    return this.panel = this.btn.nextElementSibling; // получить панели
  }
  #getIcon() {
    return this.icon = this.btn.querySelector(this.setting.icon); // получить иконки 
  }
  #click() {
    this.btn.addEventListener('click', () => {
      if (this.panel.style.maxHeight) {
        this.panel.style.maxHeight = null;
        this.icon ? this.icon.classList.remove('active') : '';
        this.dropDown.classList.remove('active');
      } else {
        this.panel.style.maxHeight = this.panel.scrollHeight + "px";
        this.icon ? this.icon.classList.add('active') : '';
        this.dropDown.classList.add('active')
      }
    })
  }
  #closeWindow() {
    this.dropDown.addEventListener('click', () => {
      document.addEventListener("click", event => {
        this.#hide(event)
      });
    })
  }
  #hide(event) {
    if (this.dropDown.contains(event.target))
      return;
    this.panel.style.maxHeight = null;
    this.icon ? this.icon.classList.remove('active') : '';
    this.dropDown.classList.remove('active');
    document.removeEventListener("click", event => {
      this.#hide(event)
    });
  }
}


let dropdown = document.querySelector('.dropdown')

new DropDownList(dropdown, {
  icon: '.dropdown__icon', // не обязательно, дававить .active 
  closeWindow: true, // не обязательно, закрывать панель при клике вне блока

})