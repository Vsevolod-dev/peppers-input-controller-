class InputController {
    static ACTION_ACTIVATED = 'input-controller:action-activated' 
    static ACTION_DEACTIVATED = 'input-controller:action-deactivated' 

    actions = {}
    enabled = true
    focused = true
    pressedKeys = {}
    intervalCount = 0

    /*
        {
            "left": { // название активности
                keys: [37,65], // список кодов кнопок соответствующих активности
                enabled: false // отключенная активность
            },
            "right": {
                keys: [39,68]
            },
	    }
    */

    constructor(actionsToBind, target) {
        if (actionsToBind) this.bindActions(actionsToBind)

        if (target) {
            this.attach(target)
        }
    }

    bindActions(actionsToBind) {
        Object.keys(actionsToBind).forEach(key => {
            if (this.actions[key]) {
                actionsToBind[key]['keys'].forEach(item => {
                    if (!this.actions[key]['keys'].includes(item)) {
                        this.actions[key]['keys'].push(item)
                    }
                })
                
            } else {
                this.actions[key] = actionsToBind[key]
            }
        })
    }

    enableAction(actionName) {
        this.actions[actionName].enabled = true
    }

    disableAction(actionName) {
        this.actions[actionName].enabled = false
    }

    isActionActive(actionName) {
        // if (!this.enabled) return false
        // if (!this.focused) return false

        return this.actions[actionName].enabled
    }

    isKeyPressed(keyCode) {
        return this.pressedKeys[keyCode] === true
    }

    activate(actionName, eventDetails) {
        if (!this.isActionActive(actionName)) return;
    
        const event = new CustomEvent(InputController.ACTION_ACTIVATED, {
          detail: eventDetails
        });

        if (this.target) this.target.dispatchEvent(event);
    }

    deactivate(actionName, eventDetails) {    
        const event = new CustomEvent(InputController.ACTION_DEACTIVATED, {
          detail: eventDetails
        });
        if (this.target) this.target.dispatchEvent(event);
    }
    
    onKeyDown(event) {
        const actionName = Object.keys(this.actions).find(key => this.actions[key].keys.indexOf(event.keyCode) !== -1)
        if (!actionName) return
        this.enableAction(actionName)
        this.pressedKeys[event.keyCode] = true

        this.activate(actionName, { activity: actionName, keyCode: event.keyCode })
    }
    
    onKeyUp(event) {
        const actionName = Object.keys(this.actions).find(key => this.actions[key].keys.indexOf(event.keyCode) !== -1)
        if (!actionName) return
        this.disableAction(actionName)
        this.pressedKeys[event.keyCode] = false

        // const i = this.pressedKeys.findIndex(item => item.key === event.keyCode)
        // this.pressedKeys.splice(i, 1)

        this.deactivate(actionName, { activity: actionName, keyCode: event.keyCode })
    }

    attach(target, dontEnable = true) {
        if (this.target !== target) {
            // it's for identical links on functions (for remove listener)
            target.kd = this.onKeyDown.bind(this)
            target.ku = this.onKeyUp.bind(this)

            target.addEventListener("keydown", target.kd);
            target.addEventListener("keyup", target.ku);

            this.target = target
            this.enabled = dontEnable
        }
    }

    detach() {
        this.target.removeEventListener("keydown", this.target.kd);
        this.target.removeEventListener("keyup", this.target.ku);

        this.target = null
    }
    
    enable() {
        this.enabled = true;
    }

    disable() {
        this.enabled = false;
    }

    focus() {
        this.focused = true;
    }

    blur() {
        this.focused = false;
    }
}
