import { Component, OnInit, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'des-stackedbarchart',
    templateUrl: './barchart.component.html',
    styleUrls: ['./barchart.component.scss']
})

export class StackedBarChartComponent implements OnInit {
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
        this.datum = [{
            "hospitalName": "hospital1",
            "category": "Injury & Poisoning",
            "Females": "0",
            "Males": "4",
            "Unknown": "0",
            "count": "4"
        },
        {
            "hospitalName": "hospital1",
            "category": "Symptoms, Signs, & Ill-Defined Conditions",
            "Females": "1",
            "Males": "1",
            "Unknown": "0",
            "count": "2"
        },
        {
            "hospitalName": "hospital2",
            "category": "Mental Disorders",
            "Females": "0",
            "Males": "1",
            "Unknown": "0",
            "count": "1"
        }];

        this.renderChart();
    }

    renderChart() {
        var svg = this.container.append("svg")
            .attr("width", this.width + 60)
            .attr("height", this.height + 50);
        var g = svg.append("g").attr("transform", "translate(" + 60 + "," + 30 + ")");

        const x = d3.scaleBand()
            .rangeRound([0, this.width])
            .paddingInner(0.1)
            .align(0.1);

        const y = d3.scaleLinear()
            .rangeRound([this.height, 0]);

        const z = d3.scaleOrdinal()
            .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);


        var columns = d3.keys(this.datum[0]);

        var keys = columns.slice(2, 5);
        console.log(keys);

        this.datum.sort(function (a, b) { return b.total - a.total; });
        x.domain(this.datum.map(function (d, i) { return i; }));
        y.domain([0, d3.max(this.datum, function (d) { return d.count; })]).nice();
        z.domain(keys);

        g.append("g")
            .selectAll("g")
            .data(d3.stack().keys(keys)(this.datum))
            .enter().append("g")
            .attr("fill", function (d) { return z(d.key); })
            .selectAll("rect")
            .data(function (d) { return d; })
            .enter().append("rect")
            .attr("x", function (d, i) { return x(i); })
            .attr("y", function (d) { return y(d[1]); })
            .attr("height", function (d) { return y(d[0]) - y(d[1]); })
            .attr("width", x.bandwidth());

        g.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3.axisBottom(x).tickFormat((d, i) => { return this.datum[i].hospitalName }));

        g.append("g")
            .attr("class", "axis")
            .call(d3.axisLeft(y).ticks(null, "s"))
            .append("text")
            .attr("x", 2)
            .attr("y", y(y.ticks().pop()) + 0.5)
            .attr("dy", "0.32em")
            .attr("fill", "#000")
            .attr("font-weight", "bold")
            .attr("text-anchor", "start")
            .text("Population");

        var legend = g.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(keys.slice().reverse())
            .enter().append("g")
            .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
            .attr("x", this.width - 19)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", z);

        legend.append("text")
            .attr("x", this.width - 24)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(function (d) { return d; });

    }
}