import { Component, OnInit, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'des-sunburst-chart',
    templateUrl: './barchart.component.html',
    styleUrls: ['./barchart.component.scss']
})

export class SunBurstComponent implements OnInit {
    private container;
    private svgObj = {};
    private data = [];
    private width = 600;
    private height = 600;
    private mode = 'linear';
    private color_palettes = [['#4abdac', '#fc4a1a', '#f7b733'], ['#f03b20', '#feb24c', '#ffeda0'], ['#007849', '#0375b4', '#ffce00'], ['#373737', '#dcd0c0', '#c0b283'], ['#e37222', '#07889b', '#eeaa7b'], ['#062f4f', '#813772', '#b82601'], ['#565656', '#76323f', '#c09f80']];
    private radius;
    private first_build;
    private node;

    constructor(private el: ElementRef) {
        this.container = d3.select(el.nativeElement);
    }

    ngOnInit() {
        this.data = [{
            "idx": "Bible",
            "grpsize": 0,
            "name": "Bible",
            "size": 0,
            "parent": ""
        }, {
            "idx": "OT",
            "grpsize": 0,
            "name": "OT",
            "size": 0,
            "parent": "Bible"
        }, {
            "idx": "NT",
            "grpsize": 0,
            "name": "NT",
            "size": 0,
            "parent": "Bible"
        }, {
            "idx": "OTPent",
            "grpsize": 0,
            "name": "Pent",
            "size": 0,
            "parent": "OT"
        }, {
            "parent": "OTPent",
            "grpsize": 50,
            "verse_counts": [31, 25, 24, 26, 32, 22, 24, 22, 29, 32, 32, 20, 18, 24, 21, 16, 27, 33, 38, 18, 34, 24, 20, 67, 34, 35, 46, 22, 35, 43, 55, 32, 20, 31, 29, 43, 36, 30, 23, 23, 57, 38, 34, 34, 28, 34, 31, 22, 33, 26],
            "idx": "book_Gen",
            "size": 1,
            "name": "Gen"
        }, {
            "parent": "OTPent",
            "grpsize": 40,
            "verse_counts": [22, 25, 22, 31, 23, 30, 25, 32, 35, 29, 10, 51, 22, 31, 27, 36, 16, 27, 25, 26, 36, 31, 33, 18, 40, 37, 21, 43, 46, 38, 18, 35, 23, 35, 35, 38, 29, 31, 43, 38],
            "idx": "book_Exo",
            "size": 1,
            "name": "Exo"
        }, {
            "parent": "OTPent",
            "grpsize": 27,
            "verse_counts": [17, 16, 17, 35, 19, 30, 38, 36, 24, 20, 47, 8, 59, 57, 33, 34, 16, 30, 37, 27, 24, 33, 44, 23, 55, 46, 34],
            "idx": "book_Lev",
            "size": 1,
            "name": "Lev"
        }, {
            "parent": "OTPent",
            "grpsize": 36,
            "verse_counts": [54, 34, 51, 49, 31, 27, 89, 26, 23, 36, 35, 16, 33, 45, 41, 50, 13, 32, 22, 29, 35, 41, 30, 25, 18, 65, 23, 31, 40, 16, 54, 42, 56, 29, 34, 13],
            "idx": "book_Num",
            "size": 1,
            "name": "Num"
        }, {
            "parent": "OTPent",
            "grpsize": 34,
            "verse_counts": [46, 37, 29, 49, 33, 25, 26, 20, 29, 22, 32, 32, 18, 29, 23, 22, 20, 22, 21, 20, 23, 30, 25, 22, 19, 19, 26, 68, 29, 20, 30, 52, 29, 12],
            "idx": "book_Deu",
            "size": 1,
            "name": "Deu"
        }, {
            "idx": "OTHist",
            "grpsize": 0,
            "name": "Hist",
            "size": 0,
            "parent": "OT"
        }, {
            "parent": "OTHist",
            "grpsize": 24,
            "verse_counts": [18, 24, 17, 24, 15, 27, 26, 35, 27, 43, 23, 24, 33, 15, 63, 10, 18, 28, 51, 9, 45, 34, 16, 33],
            "idx": "book_Jos",
            "size": 1,
            "name": "Jos"
        }, {
            "parent": "OTHist",
            "grpsize": 21,
            "verse_counts": [36, 23, 31, 24, 31, 40, 25, 35, 57, 18, 40, 15, 25, 20, 20, 31, 13, 31, 30, 48, 25],
            "idx": "book_Jdg",
            "size": 1,
            "name": "Jdg"
        }, {
            "parent": "OTHist",
            "grpsize": 4,
            "verse_counts": [22, 23, 18, 22],
            "idx": "book_Rut",
            "size": 1,
            "name": "Rut"
        }, {
            "parent": "OTHist",
            "grpsize": 31,
            "verse_counts": [28, 36, 21, 22, 12, 21, 17, 22, 27, 27, 15, 25, 23, 52, 35, 23, 58, 30, 24, 42, 15, 23, 29, 22, 44, 25, 12, 25, 11, 31, 13],
            "idx": "book_1Sa",
            "size": 1,
            "name": "1Sa"
        }, {
            "parent": "OTHist",
            "grpsize": 24,
            "verse_counts": [27, 32, 39, 12, 25, 23, 29, 18, 13, 19, 27, 31, 39, 33, 37, 23, 29, 33, 43, 26, 22, 51, 39, 25],
            "idx": "book_2Sa",
            "size": 1,
            "name": "2Sa"
        }, {
            "parent": "OTHist",
            "grpsize": 22,
            "verse_counts": [53, 46, 28, 34, 18, 38, 51, 66, 28, 29, 43, 33, 34, 31, 34, 34, 24, 46, 21, 43, 29, 53],
            "idx": "book_1Ki",
            "size": 1,
            "name": "1Ki"
        }, {
            "parent": "OTHist",
            "grpsize": 25,
            "verse_counts": [18, 25, 27, 44, 27, 33, 20, 29, 37, 36, 21, 21, 25, 29, 38, 20, 41, 37, 37, 21, 26, 20, 37, 20, 30],
            "idx": "book_2Ki",
            "size": 1,
            "name": "2Ki"
        }, {
            "parent": "OTHist",
            "grpsize": 29,
            "verse_counts": [54, 55, 24, 43, 26, 81, 40, 40, 44, 14, 47, 40, 14, 17, 29, 43, 27, 17, 19, 8, 30, 19, 32, 31, 31, 32, 34, 21, 30],
            "idx": "book_1Ch",
            "size": 1,
            "name": "1Ch"
        }, {
            "parent": "OTHist",
            "grpsize": 36,
            "verse_counts": [17, 18, 17, 22, 14, 42, 22, 18, 31, 19, 23, 16, 22, 15, 19, 14, 19, 34, 11, 37, 20, 12, 21, 27, 28, 23, 9, 27, 36, 27, 21, 33, 25, 33, 27, 23],
            "idx": "book_2Ch",
            "size": 1,
            "name": "2Ch"
        }, {
            "parent": "OTHist",
            "grpsize": 10,
            "verse_counts": [11, 70, 13, 24, 17, 22, 28, 36, 15, 44],
            "idx": "book_Ezr",
            "size": 1,
            "name": "Ezr"
        }, {
            "parent": "OTHist",
            "grpsize": 13,
            "verse_counts": [11, 20, 32, 23, 19, 19, 73, 18, 38, 39, 36, 47, 31],
            "idx": "book_Neh",
            "size": 1,
            "name": "Neh"
        }, {
            "parent": "OTHist",
            "grpsize": 10,
            "verse_counts": [22, 23, 15, 17, 14, 14, 10, 17, 32, 3],
            "idx": "book_Est",
            "size": 1,
            "name": "Est"
        }, {
            "idx": "OTPoet",
            "grpsize": 0,
            "name": "Poet",
            "size": 0,
            "parent": "OT"
        }, {
            "parent": "OTPoet",
            "grpsize": 42,
            "verse_counts": [22, 13, 26, 21, 27, 30, 21, 22, 35, 22, 20, 25, 28, 22, 35, 22, 16, 21, 29, 29, 34, 30, 17, 25, 6, 14, 23, 28, 25, 31, 40, 22, 33, 37, 16, 33, 24, 41, 30, 24, 34, 17],
            "idx": "book_Job",
            "size": 1,
            "name": "Job"
        }, {
            "parent": "OTPoet",
            "grpsize": 150,
            "verse_counts": [6, 12, 8, 8, 12, 10, 17, 9, 20, 18, 7, 8, 6, 7, 5, 11, 15, 50, 14, 9, 13, 31, 6, 10, 22, 12, 14, 9, 11, 12, 24, 11, 22, 22, 28, 12, 40, 22, 13, 17, 13, 11, 5, 26, 17, 11, 9, 14, 20, 23, 19, 9, 6, 7, 23, 13, 11, 11, 17, 12, 8, 12, 11, 10, 13, 20, 7, 35, 36, 5, 24, 20, 28, 23, 10, 12, 20, 72, 13, 19, 16, 8, 18, 12, 13, 17, 7, 18, 52, 17, 16, 15, 5, 23, 11, 13, 12, 9, 9, 5, 8, 28, 22, 35, 45, 48, 43, 13, 31, 7, 10, 10, 9, 8, 18, 19, 2, 29, 176, 7, 8, 9, 4, 8, 5, 6, 5, 6, 8, 8, 3, 18, 3, 3, 21, 26, 9, 8, 24, 13, 10, 7, 12, 15, 21, 10, 20, 14, 9, 6],
            "idx": "book_Psa",
            "size": 1,
            "name": "Psa"
        }, {
            "parent": "OTPoet",
            "grpsize": 31,
            "verse_counts": [33, 22, 35, 27, 23, 35, 27, 36, 18, 32, 31, 28, 25, 35, 33, 33, 28, 24, 29, 30, 31, 29, 35, 34, 28, 28, 27, 28, 27, 33, 31],
            "idx": "book_Prv",
            "size": 1,
            "name": "Prv"
        }, {
            "parent": "OTPoet",
            "grpsize": 12,
            "verse_counts": [18, 26, 22, 16, 20, 12, 29, 17, 18, 20, 10, 14],
            "idx": "book_Ecc",
            "size": 1,
            "name": "Ecc"
        }, {
            "parent": "OTPoet",
            "grpsize": 8,
            "verse_counts": [17, 17, 11, 16, 16, 13, 13, 14],
            "idx": "book_Song",
            "size": 1,
            "name": "Song"
        }, {
            "idx": "OTMajor",
            "grpsize": 0,
            "name": "Major",
            "size": 0,
            "parent": "OT"
        }, {
            "parent": "OTMajor",
            "grpsize": 66,
            "verse_counts": [31, 22, 26, 6, 30, 13, 25, 22, 21, 34, 16, 6, 22, 32, 9, 14, 14, 7, 25, 6, 17, 25, 18, 23, 12, 21, 13, 29, 24, 33, 9, 20, 24, 17, 10, 22, 38, 22, 8, 31, 29, 25, 28, 28, 25, 13, 15, 22, 26, 11, 23, 15, 12, 17, 13, 12, 21, 14, 21, 22, 11, 12, 19, 12, 25, 24],
            "idx": "book_Isa",
            "size": 1,
            "name": "Isa"
        }, {
            "parent": "OTMajor",
            "grpsize": 52,
            "verse_counts": [19, 37, 25, 31, 31, 30, 34, 22, 26, 25, 23, 17, 27, 22, 21, 21, 27, 23, 15, 18, 14, 30, 40, 10, 38, 24, 22, 17, 32, 24, 40, 44, 26, 22, 19, 32, 21, 28, 18, 16, 18, 22, 13, 30, 5, 28, 7, 47, 39, 46, 64, 34],
            "idx": "book_Jer",
            "size": 1,
            "name": "Jer"
        }, {
            "parent": "OTMajor",
            "grpsize": 5,
            "verse_counts": [22, 22, 66, 22, 22],
            "idx": "book_Lam",
            "size": 1,
            "name": "Lam"
        }, {
            "parent": "OTMajor",
            "grpsize": 48,
            "verse_counts": [28, 10, 27, 17, 17, 14, 27, 18, 11, 22, 25, 28, 23, 23, 8, 63, 24, 32, 14, 49, 32, 31, 49, 27, 17, 21, 36, 26, 21, 26, 18, 32, 33, 31, 15, 38, 28, 23, 29, 49, 26, 20, 27, 31, 25, 24, 23, 35],
            "idx": "book_Eze",
            "size": 1,
            "name": "Eze"
        }, {
            "parent": "OTMajor",
            "grpsize": 12,
            "verse_counts": [21, 49, 30, 37, 31, 28, 28, 27, 27, 21, 45, 13],
            "idx": "book_Dan",
            "size": 1,
            "name": "Dan"
        }, {
            "idx": "OTMinor",
            "grpsize": 0,
            "name": "Minor",
            "size": 0,
            "parent": "OT"
        }, {
            "parent": "OTMinor",
            "grpsize": 14,
            "verse_counts": [11, 23, 5, 19, 15, 11, 16, 14, 17, 15, 12, 14, 16, 9],
            "idx": "book_Hos",
            "size": 1,
            "name": "Hos"
        }, {
            "parent": "OTMinor",
            "grpsize": 3,
            "verse_counts": [20, 32, 21],
            "idx": "book_Joe",
            "size": 1,
            "name": "Joe"
        }, {
            "parent": "OTMinor",
            "grpsize": 9,
            "verse_counts": [15, 16, 15, 13, 27, 14, 17, 14, 15],
            "idx": "book_Amo",
            "size": 1,
            "name": "Amo"
        }, {
            "parent": "OTMinor",
            "grpsize": 1,
            "verse_counts": [21],
            "idx": "book_Oba",
            "size": 1,
            "name": "Oba"
        }, {
            "parent": "OTMinor",
            "grpsize": 4,
            "verse_counts": [17, 10, 10, 11],
            "idx": "book_Jon",
            "size": 1,
            "name": "Jon"
        }, {
            "parent": "OTMinor",
            "grpsize": 7,
            "verse_counts": [16, 13, 12, 13, 15, 16, 20],
            "idx": "book_Mic",
            "size": 1,
            "name": "Mic"
        }, {
            "parent": "OTMinor",
            "grpsize": 3,
            "verse_counts": [15, 13, 19],
            "idx": "book_Nah",
            "size": 1,
            "name": "Nah"
        }, {
            "parent": "OTMinor",
            "grpsize": 3,
            "verse_counts": [17, 20, 19],
            "idx": "book_Hab",
            "size": 1,
            "name": "Hab"
        }, {
            "parent": "OTMinor",
            "grpsize": 3,
            "verse_counts": [18, 15, 20],
            "idx": "book_Zep",
            "size": 1,
            "name": "Zep"
        }, {
            "parent": "OTMinor",
            "grpsize": 2,
            "verse_counts": [15, 23],
            "idx": "book_Hag",
            "size": 1,
            "name": "Hag"
        }, {
            "parent": "OTMinor",
            "grpsize": 14,
            "verse_counts": [21, 13, 10, 14, 11, 15, 14, 23, 17, 12, 17, 14, 9, 21],
            "idx": "book_Zec",
            "size": 1,
            "name": "Zec"
        }, {
            "parent": "OTMinor",
            "grpsize": 4,
            "verse_counts": [14, 17, 18, 6],
            "idx": "book_Mal",
            "size": 1,
            "name": "Mal"
        }, {
            "idx": "NTGosp",
            "grpsize": 0,
            "name": "Gosp",
            "size": 0,
            "parent": "NT"
        }, {
            "parent": "NTGosp",
            "grpsize": 28,
            "verse_counts": [25, 23, 17, 25, 48, 34, 29, 34, 38, 42, 30, 50, 58, 36, 39, 28, 27, 35, 30, 34, 46, 46, 39, 51, 46, 75, 66, 20],
            "idx": "book_Mat",
            "size": 1,
            "name": "Mat"
        }, {
            "parent": "NTGosp",
            "grpsize": 16,
            "verse_counts": [45, 28, 35, 41, 43, 56, 37, 38, 50, 52, 33, 44, 37, 72, 47, 20],
            "idx": "book_Mar",
            "size": 1,
            "name": "Mar"
        }, {
            "parent": "NTGosp",
            "grpsize": 24,
            "verse_counts": [80, 52, 38, 44, 39, 49, 50, 56, 62, 42, 54, 59, 35, 35, 32, 31, 37, 43, 48, 47, 38, 71, 56, 53],
            "idx": "book_Luk",
            "size": 1,
            "name": "Luk"
        }, {
            "parent": "NTGosp",
            "grpsize": 21,
            "verse_counts": [51, 25, 36, 54, 47, 71, 53, 59, 41, 42, 57, 50, 38, 31, 27, 33, 26, 40, 42, 31, 25],
            "idx": "book_Joh",
            "size": 1,
            "name": "Joh"
        }, {
            "idx": "NTHist",
            "grpsize": 0,
            "name": "Hist",
            "size": 0,
            "parent": "NT"
        }, {
            "parent": "NTHist",
            "grpsize": 28,
            "verse_counts": [26, 47, 26, 37, 42, 15, 60, 40, 43, 48, 30, 25, 52, 28, 41, 40, 34, 28, 41, 38, 40, 30, 35, 27, 27, 32, 44, 31],
            "idx": "book_Act",
            "size": 1,
            "name": "Act"
        }, {
            "idx": "NTPaul",
            "grpsize": 0,
            "name": "Paul",
            "size": 0,
            "parent": "NT"
        }, {
            "parent": "NTPaul",
            "grpsize": 16,
            "verse_counts": [32, 29, 31, 25, 21, 23, 25, 39, 33, 21, 36, 21, 14, 23, 33, 27],
            "idx": "book_Rom",
            "size": 1,
            "name": "Rom"
        }, {
            "parent": "NTPaul",
            "grpsize": 16,
            "verse_counts": [31, 16, 23, 21, 13, 20, 40, 13, 27, 33, 34, 31, 13, 40, 58, 24],
            "idx": "book_1Co",
            "size": 1,
            "name": "1Co"
        }, {
            "parent": "NTPaul",
            "grpsize": 13,
            "verse_counts": [24, 17, 18, 18, 21, 18, 16, 24, 15, 18, 33, 21, 14],
            "idx": "book_2Co",
            "size": 1,
            "name": "2Co"
        }, {
            "parent": "NTPaul",
            "grpsize": 6,
            "verse_counts": [24, 21, 29, 31, 26, 18],
            "idx": "book_Gal",
            "size": 1,
            "name": "Gal"
        }, {
            "parent": "NTPaul",
            "grpsize": 6,
            "verse_counts": [23, 22, 21, 32, 33, 24],
            "idx": "book_Eph",
            "size": 1,
            "name": "Eph"
        }, {
            "parent": "NTPaul",
            "grpsize": 4,
            "verse_counts": [30, 30, 21, 23],
            "idx": "book_Phi",
            "size": 1,
            "name": "Phi"
        }, {
            "parent": "NTPaul",
            "grpsize": 4,
            "verse_counts": [29, 23, 25, 18],
            "idx": "book_Col",
            "size": 1,
            "name": "Col"
        }, {
            "parent": "NTPaul",
            "grpsize": 5,
            "verse_counts": [10, 20, 13, 18, 28],
            "idx": "book_1Th",
            "size": 1,
            "name": "1Th"
        }, {
            "parent": "NTPaul",
            "grpsize": 3,
            "verse_counts": [12, 17, 18],
            "idx": "book_2Th",
            "size": 1,
            "name": "2Th"
        }, {
            "parent": "NTPaul",
            "grpsize": 6,
            "verse_counts": [20, 15, 16, 16, 25, 21],
            "idx": "book_1Ti",
            "size": 1,
            "name": "1Ti"
        }, {
            "parent": "NTPaul",
            "grpsize": 4,
            "verse_counts": [18, 26, 17, 22],
            "idx": "book_2Ti",
            "size": 1,
            "name": "2Ti"
        }, {
            "parent": "NTPaul",
            "grpsize": 3,
            "verse_counts": [16, 15, 15],
            "idx": "book_Tit",
            "size": 1,
            "name": "Tit"
        }, {
            "parent": "NTPaul",
            "grpsize": 1,
            "verse_counts": [25],
            "idx": "book_Phm",
            "size": 1,
            "name": "Phm"
        }, {
            "idx": "NTEpistle",
            "grpsize": 0,
            "name": "Epistle",
            "size": 0,
            "parent": "NT"
        }, {
            "parent": "NTEpistle",
            "grpsize": 13,
            "verse_counts": [14, 18, 19, 16, 14, 20, 28, 13, 28, 39, 40, 29, 25],
            "idx": "book_Heb",
            "size": 1,
            "name": "Heb"
        }, {
            "parent": "NTEpistle",
            "grpsize": 5,
            "verse_counts": [27, 26, 18, 17, 20],
            "idx": "book_Jam",
            "size": 1,
            "name": "Jam"
        }, {
            "parent": "NTEpistle",
            "grpsize": 5,
            "verse_counts": [25, 25, 22, 19, 14],
            "idx": "book_1Pe",
            "size": 1,
            "name": "1Pe"
        }, {
            "parent": "NTEpistle",
            "grpsize": 3,
            "verse_counts": [21, 22, 18],
            "idx": "book_2Pe",
            "size": 1,
            "name": "2Pe"
        }, {
            "parent": "NTEpistle",
            "grpsize": 5,
            "verse_counts": [10, 29, 24, 21, 21],
            "idx": "book_1Jo",
            "size": 1,
            "name": "1Jo"
        }, {
            "parent": "NTEpistle",
            "grpsize": 1,
            "verse_counts": [13],
            "idx": "book_2Jo",
            "size": 1,
            "name": "2Jo"
        }, {
            "parent": "NTEpistle",
            "grpsize": 1,
            "verse_counts": [14],
            "idx": "book_3Jo",
            "size": 1,
            "name": "3Jo"
        }, {
            "parent": "NTEpistle",
            "grpsize": 1,
            "verse_counts": [25],
            "idx": "book_Jud",
            "size": 1,
            "name": "Jud"
        }, {
            "idx": "NTApoc",
            "grpsize": 0,
            "name": "Apoc",
            "size": 0,
            "parent": "NT"
        }, {
            "parent": "NTApoc",
            "grpsize": 22,
            "verse_counts": [20, 29, 22, 11, 14, 17, 17, 13, 21, 11, 19, 17, 18, 20, 8, 21, 18, 24, 21, 15, 27, 21],
            "idx": "book_Rev",
            "size": 1,
            "name": "Rev"
        }];
        this.svgObj['root'] = d3.stratify().id(function (d) { return d.idx; }).parentId(function (d) { return d.parent; })(this.data)
        this.radius = (Math.min(this.width, this.height) / 2) - 10;
        this.init();
    }

    init() {
        const self = this;
        this.svgObj['svg'] = this.container.append('svg')
            .attr('class', 'main-svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .append("g")
            .attr("id", "bigG")
            .attr("transform", "translate(" + this.width / 2 + "," + (this.height / 2) + ")");


        this.svgObj['x'] = d3.scaleLinear().range([0, 2 * Math.PI]);
        this.svgObj['y'] = d3.scaleLinear().range([0, this.radius]);
        this.svgObj['color'] = d3.scaleLinear().domain([0, 0.5, 1]).range(this.color_palettes[~~(Math.random() * 6)]);
        this.svgObj['partition'] = d3.partition();

        this.svgObj['arc'] = d3.arc()
            .startAngle(function (d) { return Math.max(0, Math.min(2 * Math.PI, self.svgObj['x'](d.x0))); })
            .endAngle(function (d) { return Math.max(0, Math.min(2 * Math.PI, self.svgObj['x'](d.x1))); })
            .innerRadius(function (d) { return Math.max(0, self.svgObj['y'](d.y0)); })
            .outerRadius(function (d) { return Math.max(0, self.svgObj['y'](d.y1)); });


        this.first_build = true;
        this.update();
    }

    update() {
        const self = this;
        if (this.mode == "linear") {      // Determine how to size the slices.
            this.svgObj['root'].sum(function (d) { return d.size; });
        } else {
            this.svgObj['root'].sum(function (d) { return d.grpsize; });
        }

        if (this.first_build) {
            // Add a <path d="[shape]" style="fill: [color];"><title>[popup text]</title></path>
            //   to each <g> element; add click handler; save slice widths for tweening
            var gSlices = this.svgObj['svg'].selectAll("g").data(this.svgObj['partition'](this.svgObj['root']).descendants(), function (d) { return d.data.id; }).enter().append("g");
            gSlices.exit().remove();
            gSlices.append("path").style("fill", function (d) {
                return d.parent ? self.svgObj['color'](d.x0) : "white";
            })
                .on("click", function (d) { self.click.call(this, { self, d }) })
                .append("title").text(function (d) { return d.data.name; });  // Return white for root.
            gSlices.append("text").attr("dy", ".35em").text(function (d) { return d.parent ? d.data.name : ""; }).attr("id", function (d) { return "w" + d.data.name; }); // TODO: was d.data.word
            this.svgObj['svg'].selectAll("path").append("title").text(function (d) { return d.data.word; })

            this.first_build = false;
        } else {
            this.svgObj['svg'].selectAll("path").data(this.svgObj['partition'](this.svgObj['root']).descendants());
        }


        this.svgObj['svg'].selectAll("path").transition("update").duration(750).attrTween("d", function (d, i) {
            return self.arcTweenPath(d, i);
        });
        this.svgObj['svg'].selectAll("text").transition("update").duration(750).attrTween("transform", function (d, i) { return self.arcTweenText(d, i); })
            .attr('text-anchor', function (d) { return d.textAngle > 180 ? "start" : "end"; })
            .attr("dx", function (d) { return d.textAngle > 180 ? -13 : 13; })
            .attr("opacity", function (e) { return e.x1 - e.x0 > 0.01 ? 1 : 0; });
    }

    click(obj) {
        const { self, d } = obj;
        self.node = d;

        self.svgObj['svg'].selectAll("path").transition("click").duration(750).attrTween("d", function (d, i) { return self.arcTweenPath(d, i); });
        self.svgObj['svg'].selectAll("text").transition("click").duration(750).attrTween("transform", function (d, i) { return self.arcTweenText(d, i); })
            .attr('text-anchor', function (d) { return d.textAngle > 180 ? "start" : "end"; })
            .attr("dx", function (d) { return d.textAngle > 180 ? -13 : 13; })
            .attr("opacity", function (e) {
                if (e.x0 >= d.x0 && e.x1 <= d.x1) {
                    return (e.x1 - e.x0 > 0.01 ? 1 : 0);
                } else {
                    return 0;
                }
            })
    }

    arcTweenText(a, i) {
        const self = this;
        var oi = d3.interpolate({ x0: (a.x0s ? a.x0s : 0), x1: (a.x1s ? a.x1s : 0), y0: (a.y0s ? a.y0s : 0), y1: (a.y1s ? a.y1s : 0) }, a);
        function tween(t) {
            var b = oi(t);
            var ang = ((self.svgObj['x']((b.x0 + b.x1) / 2) - Math.PI / 2) / Math.PI * 180);
            b.textAngle = (ang > 90) ? 180 + ang : ang;
            a.centroid = self.svgObj['arc'].centroid(b);
            //b.opacity = (b.x1 - b.x0) > 0.01 ? 0 : 0;
            //console.log(b.data.name + " x1:" + b.x1 + " x0:" + b.x0);
            return "translate(" + self.svgObj['arc'].centroid(b) + ")rotate(" + b.textAngle + ")";
        }
        return tween;
    }


    arcTweenPath(a, i) {
        const self = this;
        // (a.x0s ? a.x0s : 0) -- grab the prev saved x0 or set to 0 (for 1st time through)
        // avoids the stash() and allows the sunburst to grow into being
        var oi = d3.interpolate({ x0: (a.x0s ? a.x0s : 0), x1: (a.x1s ? a.x1s : 0), y0: (a.y0s ? a.y0s : 0), y1: (a.y1s ? a.y1s : 0) }, a);
        function tween(t) {
            var b = oi(t);
            a.x0s = b.x0;
            a.x1s = b.x1;
            a.y0s = b.y0;
            a.y1s = b.y1;
            return self.svgObj['arc'](b);
        }
        if (i == 0 && this.node) {  // If we are on the first arc, adjust the x domain to match the root node at the current zoom level.
            var xd = d3.interpolate(self.svgObj['x'].domain(), [self.node.x0, self.node.x1]);
            var yd = d3.interpolate(self.svgObj['y'].domain(), [self.node.y0, 1]);
            var yr = d3.interpolate(self.svgObj['y'].range(), [self.node.y0 ? 40 : 0, self.radius]);

            return function (t) {
                self.svgObj['x'].domain(xd(t));
                self.svgObj['y'].domain(yd(t)).range(yr(t));
                return tween(t);
            };
        } else {
            return tween;
        }
    }










}