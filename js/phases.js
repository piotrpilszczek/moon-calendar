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
        if((this.daysIntoCycle >= 0 && this.daysIntoCycle <= 0.6) || (this.daysIntoCycle <= 29.5 && this.daysIntoCycle >= 28.9)) return 'new moon'
        else if(this.daysIntoCycle > 0.6 && this.daysIntoCycle < 6.4) return 'waning crescent'
        else if(this.daysIntoCycle >= 6.4 && this.daysIntoCycle < 7.6) return 'third quarter'
        else if(this.daysIntoCycle >= 7.6 && this.daysIntoCycle < 14.4) return 'waning gibbous'
        else if(this.daysIntoCycle >= 14.4 && this.daysIntoCycle < 15.6) return 'full moon'
        else if(this.daysIntoCycle >= 15.6 && this.daysIntoCycle < 21.4) return 'waxing gibbous'
        else if(this.daysIntoCycle >= 21.4 && this.daysIntoCycle < 22.6) return 'first quarter'
        else if(this.daysIntoCycle >= 22.6 && this.daysIntoCycle < 28.9) return 'waxing crescent'
    }

    get image() {
        if((this.daysIntoCycle >= 0 && this.daysIntoCycle <= 0.6) || (this.daysIntoCycle <= 29.5 && this.daysIntoCycle >= 28.9)) return 'new-moon.png'
        else if(this.daysIntoCycle > 0.6 && this.daysIntoCycle < 6.4) return 'waning-crescent.png'
        else if(this.daysIntoCycle >= 6.4 && this.daysIntoCycle < 7.6) return 'third-quarter.png'
        else if(this.daysIntoCycle >= 7.6 && this.daysIntoCycle < 14.4) return 'waning-gibbous.png'
        else if(this.daysIntoCycle >= 14.4 && this.daysIntoCycle < 15.6) return 'full-moon.png'
        else if(this.daysIntoCycle >= 15.6 && this.daysIntoCycle < 21.4) return 'waxing-gibbous.png'
        else if(this.daysIntoCycle >= 21.4 && this.daysIntoCycle < 22.6) return 'first-quarter.png'
        else if(this.daysIntoCycle >= 22.6 && this.daysIntoCycle < 28.9) return 'waxing-crescent.png'
    }
}