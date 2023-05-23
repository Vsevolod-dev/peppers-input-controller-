class InputController {
    static ACTION_ACTIVATED = 'input-controller:action-activated' 
    static ACTION_DEACTIVATED = 'input-controller:action-deactivated' 

    actions = {}
    enabled = true
    focused = true

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
        if (target) this.target = target

        console.log(target);

        // init
        target.addEventListener("keydown", this.onKeyDown.bind(this));
        target.addEventListener("keyup", this.onKeyUp.bind(this));

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
        if (!this.enabled) return 
        if (!this.focused) return
    
        const event = new CustomEvent(InputController.ACTION_ACTIVATED, {
          detail: eventDetails
        });
        console.log(this.target, event);
        this.target.dispatchEvent(event);
    }

    deactivate(actionName, eventDetails) {
        if (!this.isActionActive(actionName)) return;
        if (!this.enabled) return 
        if (!this.focused) return
    
        const event = new CustomEvent(InputController.ACTION_DEACTIVATED, {
          detail: eventDetails
        });
        this.target.dispatchEvent(event);
    }

    isActionActive(actionName) {
        return this.actions[actionName].enabled !== false
    }

    detach() {

    }
    
    onKeyDown(event) {
        console.log('onKeyDown');
        if (this.actions) Object.keys(this.actions).forEach(actionName => {
          const action = this.actions[actionName];
          if (action.keys.indexOf(event.keyCode) !== -1) {
            this.activate(actionName, { activity: actionName, keyCode: event.keyCode });
          }
        });
    }
    
    onKeyUp(event) {
        if (this.actions) Object.keys(this.actions).forEach(actionName => {
          const action = this.actions[actionName];
          if (action.keys.indexOf(event.keyCode) !== -1) {
            this.deactivate(actionName, { activity: actionName, keyCode: event.keyCode });
          }
        });
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
