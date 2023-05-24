const first = document.getElementsByClassName('first')[0]
const second = document.getElementsByClassName('second')[0]

// Создание экземпляра контроллера
const controller = new InputController(
    {
      up: { keys: [38, 87] }, // up arrow, w
      down: { keys: [40, 83] }, // down arrow, s
      left: { keys: [37, 65], /*enabled: false*/ }, // left arrow, a
      right: { keys: [39, 68] } // right arrow, d
    },
    first
);

first.addEventListener("focus", (event) => {
    controller.attach(event.target)
});

first.addEventListener("blur", (event) => {
    controller.detach(event.target)
});

second.addEventListener("focus", (event) => {
    controller.attach(event.target)
});

second.addEventListener("blur", (event) => {
    controller.detach(event.target)
});

const callbabkActivated = (event) => {
    const elem = event.target

    if (event.detail.activity === 'up') {
        elem.style.top = parseInt(elem.style.top) - 3 + 'px'
    }
    if (event.detail.activity === 'down') {
        elem.style.top = parseInt(elem.style.top) + 3 + 'px'
    }
    if (event.detail.activity === 'left') {
        elem.style.left = parseInt(elem.style.left) - 3 + 'px'
    }
    if (event.detail.activity === 'right') {
        elem.style.left = parseInt(elem.style.left) + 3 + 'px'
    }

    if (event.detail.activity === 'jump') {
        elem.style.backgroundColor = elem.style.backgroundColor === 'red' ? 'black' : 'red'
    }

    console.log(`Activated action: ${event.detail.keyCode}, activity: ${event.detail.activity}`);
}

const callbackDeactivated = (event) => {
    console.log(`Deactivated action: ${event.detail.keyCode}`);
}


first.addEventListener(InputController.ACTION_ACTIVATED, callbabkActivated);
first.addEventListener(InputController.ACTION_DEACTIVATED, callbackDeactivated);

second.addEventListener(InputController.ACTION_ACTIVATED, callbabkActivated);
second.addEventListener(InputController.ACTION_DEACTIVATED, callbackDeactivated);


document.getElementById('bind-space').addEventListener('click', () => {
    controller.bindActions({
        jump: {
            keys: [32],
            once: true
        }
    })
}, {once: true})

// Отключение активности "left"
// controller.disableAction("left");

// Включение активности "left"
// controller.enableAction("left");

// Отключение генерации событий контроллера
// controller.disable();

// Включение генерации событий контроллера
// controller.enable();

// Уведомление о получении фокуса окном
// controller.focus();

// Уведомление о потере фокуса окном
// controller.blur();
