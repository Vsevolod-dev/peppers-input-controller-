const elem = document.getElementsByClassName('first')[0]

// Создание экземпляра контроллера
const controller = new InputController(
    {
      up: { keys: [38, 87] }, // up arrow, w
      down: { keys: [40, 83] }, // down arrow, s
      left: { keys: [37, 65], enabled: false }, // left arrow, a
      right: { keys: [39, 68] } // right arrow, d
    },
    document.body
);


// Привязка обработчика к событию активации активности
document.body.addEventListener(
    InputController.ACTION_ACTIVATED,
    event => {
        if (event.detail.activity === 'up') {
            elem.style.top = parseInt(elem.style.top) - 5 + 'px'
        }
        if (event.detail.activity === 'down') {
            elem.style.top = parseInt(elem.style.top) + 5 + 'px'
        }
        if (event.detail.activity === 'left') {
            elem.style.left = parseInt(elem.style.left) - 5 + 'px'
        }
        if (event.detail.activity === 'right') {
            elem.style.left = parseInt(elem.style.left) + 5 + 'px'
        }
        console.log(`Activated action: ${event.detail.keyCode}, activity: ${event.detail.activity}`);
    }
);
  
// Привязка обработчика к событию деактивации активности
document.body.addEventListener(
    InputController.ACTION_DEACTIVATED,
    event => {
        console.log(`Deactivated action: ${event.detail.keyCode}`);
    }
);

// controller.bindActions({
//     up: {
//         keys: [73]
//     }
// })

// Отключение активности "left"
// controller.disableAction("left");

// // // Включение активности "left"
// controller.enableAction("left");

// // // Отключение генерации событий контроллера
// controller.disable();

// // // Включение генерации событий контроллера
// controller.enable();

// // // // Уведомление о получении фокуса окном
// controller.focus();

// Уведомление о потере фокуса окном
// controller.blur();
