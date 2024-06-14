import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {

  pullRate: number = 0.8;
  pityAmount: number = 120;
  pullAmount: number = 10;
  pulled: boolean = false;
  charsPulled: number = 0;
  timesMaxPity: number = 0;
  totalPulls: number = 0;
  desiredNumberOfCharacters: number = 1;
  charsOrPulls: boolean = true;
  effectivePercentage: number = 0;
  pullPercentage: number = 0;
  formattedPullPercentage: string = "0.00";
  effectivePullRate: number = 0;
  formattedEffectivePullRate: string = "0.00";
  results: string[] = [];

  toggleDesired() {
    this.charsOrPulls = !this.charsOrPulls;
  }

  simulatePulls() {
    this.charsPulled = 0;
    this.totalPulls = 0;
    this.timesMaxPity = 0;
    let pullsUntilPity = this.pityAmount;
    this.results = [];

    for (let i = 0; this.charsOrPulls ? this.charsPulled < this.desiredNumberOfCharacters : i < this.pullAmount; i++) {
        this.totalPulls++;
        let rng = Math.floor(Math.random() * 1000) + 1;

        if (pullsUntilPity === 1) {
            this.charsPulled++;
            this.timesMaxPity++;
            pullsUntilPity = this.pityAmount;
            this.results.push("Pity pull. Total pulls so far: "+this.totalPulls);
        } else if (rng <= this.pullRate * 10) {
            this.charsPulled++;
            this.results.push("Character pull at " + (this.pityAmount - pullsUntilPity)+"/"+this.pityAmount+" pity. Total pulls so far: "+this.totalPulls);
            pullsUntilPity = this.pityAmount;
        } else {
            pullsUntilPity--;
        }
    }
    // Update effectivePercentage after simulating pulls
    this.effectivePullRate = this.charsPulled / this.totalPulls;
    this.formattedEffectivePullRate = (this.effectivePullRate * 100).toFixed(2);
    this.calcRate();
    this.pulled = true;
}

calcRate() {
    let pBase = this.pullRate / 100;
    let p = this.pityAmount;

    let failP = Math.pow(1 - pBase, p);
    let pullP = 1 - failP;
    let effectiveP = pullP / p;

    this.effectivePercentage = effectiveP * 100;
    this.formattedPullPercentage = this.effectivePercentage.toFixed(2);

  }
}