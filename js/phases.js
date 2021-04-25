Number.prototype.between = function(min, max) { return this >= min && this <= max };

class PhasesDTO {
    date = new Date();
    jd = 0;
    daysIntoCycle = 0;
}

export default class Phases extends PhasesDTO {
    constructor(date = new Date()) {
        super(); this.date = date;
    }

    calculate() {
        const MONTH = 29.530588;
        this.jd = Math.floor((+this.date / 86400000) + 2440587.5);
        const daySinceNew = this.jd - 2451549.5
        const newMoonsFrac = (daySinceNew / MONTH) % 1;
        this.daysIntoCycle = Math.floor((MONTH - (newMoonsFrac * MONTH)) * 100) / 100;
    }
    
    get phase() {
        const ACCURACY = 0.6;
        const phases = [
            { scale: 0, phase: 'new moon' },
            { scale: [ 0, 7 ], phase: 'waning crescent' },
            { scale: 7, phase: 'third quarter' },
            { scale: [ 7, 15 ], phase: 'waning gibbous' },
            { scale: 15, phase: 'full moon' },
            { scale: [ 15, 22 ], phase: 'waxing gibbous' },
            { scale: 22, phase: 'first quarter' },
            { scale: [ 22, 29.5 ], phase: 'waxing crescent' },
            { scale: 29.5, phase: 'new moon' }
        ]

        let phase_ = '';

        phases.forEach(phase => {
            if(phase_ !== '') return;
            if(Array.isArray(phase.scale) && this.daysIntoCycle.between(phase.scale[0] + ACCURACY, phase.scale[1] - ACCURACY)) phase_ = phase.phase;
            else if(this.daysIntoCycle.between(phase.scale - ACCURACY, phase.scale + ACCURACY)) phase_ = phase.phase
        });

        return phase_;
    }
}