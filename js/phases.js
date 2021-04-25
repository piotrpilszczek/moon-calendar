Number.prototype.between = function(min, max, acc = 0) { return this >= min + acc && this <= max - acc };

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
        phases.forEach(phase =>
            phase_ =
                phase_ === ''
                    ? Array.isArray(phase.scale)
                        ? this.daysIntoCycle.between(phase.scale[0], phase.scale[1], ACCURACY)
                            ? phase.phase
                            : ''
                        : this.daysIntoCycle.between(phase.scale, phase.scale, -ACCURACY)
                            ? phase.phase
                            : ''
                    : phase_);
        return phase_;
    }
}