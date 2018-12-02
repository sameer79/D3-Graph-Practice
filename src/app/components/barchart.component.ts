import { Component, OnInit, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'des-barchart',
    templateUrl: './barchart.component.html',
    styleUrls: ['./barchart.component.scss']
})

export class BarChartComponent implements OnInit {
    private container;
    private width = 900;
    private height = 500;
    private marginAll = 20;
    private datum = [];
    private svgObj = {};
    constructor(private el: ElementRef) {
        this.container = d3.select(el.nativeElement);
    }

    ngOnInit() {
        this.datum = [
            {
                letter: "A",
                frequency: .080167
            },
            {
                letter: "B",
                frequency: .01492
            },
            {
                letter: "C",
                frequency: .02780
            },
            {
                letter: "D",
                frequency: .04253
            },
            {
                letter: "E",
                frequency: .012702
            },
            {
                letter: "F",
                frequency: .02288
            },
            {
                letter: "G",
                frequency: .02022
            },
            {
                letter: "H",
                frequency: .06094
            },
            {
                letter: "I",
                frequency: .06973
            },
            {
                letter: "J",
                frequency: .00153
            }
        ];

        this.renderChart();
    }

    renderChart() {
        const formatPercent = d3.format(".0%");

        const x = d3.scaleBand()
            .rangeRound([0, this.width], 0.1)
            .paddingInner(0.1);

        const y = d3.scaleLinear()
            .range([this.height, 0]);

        const xAxis = d3.axisBottom()
            .scale(x);

        const yAxis = d3.axisLeft()
            .scale(y)
            .ticks(10, "%");

        this.svgObj['svg'] = this.container.append('svg')
            .attr('width', this.width + 60)
            .attr('height', this.height + 60)
            .append('g')
            .attr('transform', 'translate(50, 30)');

        x.domain(this.datum.map((d) => d.letter));
        y.domain([0, d3.max(this.datum, (d) => d.frequency)]);

        this.svgObj['svg'].append('g')
            .attr('class', "x axis")
            .attr("transform", "translate(0, " + this.height + ")")
            .call(xAxis);

        this.svgObj['svg'].append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Frequency");

        this.svgObj['svg'].selectAll(".bar")
            .data(this.datum)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) {
                return x(d.letter);
            })
            .attr("width", x.bandwidth())
            .attr("y", function (d) {
                return y(d.frequency);
            })
            .attr("height", (d) => {
                return this.height - y(d.frequency);
            });

    }
}