class InputController {
    static ACTION_ACTIVATED = 'input-controller:action-activated' 
    static ACTION_DEACTIVATED = 'input-controller:action-deactivated' 

    actions = {}
    enabled = true
    focused = true
    pressedKeys = []

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
        console.log(this.actions);
    }

    enableAction(actionName) {
        this.actions[actionName].enabled = true
    }

    disableAction(actionName) {
        this.actions[actionName].enabled = false
    }

    activate(actionName, eventDetails) {
        if (!this.isActionActive(actionName)) return;
    
        const event = new CustomEvent(InputController.ACTION_ACTIVATED, {
          detail: eventDetails
        });
        
        this.target.dispatchEvent(event);
    }

    deactivate(actionName, eventDetails) {
        if (!this.isActionActive(actionName)) return;
    
        const event = new CustomEvent(InputController.ACTION_DEACTIVATED, {
          detail: eventDetails
        });
        this.target.dispatchEvent(event);
    }

    isActionActive(actionName) {
        return this.actions[actionName].enabled !== false
    }

    isKeyPressed(keyCode) {
        return this.pressedKeys.indexOf(keyCode) !== -1
    }
    
    onKeyDown(event) {
        if (!this.enabled) return 
        if (!this.focused) return

        if (!this.isKeyPressed(event.keyCode)) {
            this.pressedKeys.push(event.keyCode)

            const interval = setInterval(() => {                
                if (this.actions) Object.keys(this.actions).forEach(actionName => {
                    const action = this.actions[actionName];
                    if (action.keys.indexOf(event.keyCode) !== -1) {
                    this.activate(actionName, { activity: actionName, keyCode: event.keyCode });
                    }
                });

                if (!this.isKeyPressed(event.keyCode)) {
                    clearInterval(interval)
                }
            })
        }
    }
    
    onKeyUp(event) {
        const i = this.pressedKeys.indexOf(event.keyCode)
        delete this.pressedKeys[i]

        if (this.actions) Object.keys(this.actions).forEach(actionName => {
          const action = this.actions[actionName];
          if (action.keys.indexOf(event.keyCode) !== -1) {
            this.deactivate(actionName, { activity: actionName, keyCode: event.keyCode });
          }
        });
    }

    attach(target) {
        if (this.target !== target) {
            // it's for identical links on functions (for remove listener)
            target.kd = this.onKeyDown.bind(this)
            target.ku = this.onKeyUp.bind(this)

            target.addEventListener("keydown", target.kd);
            target.addEventListener("keyup", target.ku);

            this.target = target
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
