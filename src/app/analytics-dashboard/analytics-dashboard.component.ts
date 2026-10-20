import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AnalyticsService } from '../services/analytics.service';

Chart.register(...registerables);

@Component({
  selector: 'app-analytics-dashboard',
  templateUrl: './analytics-dashboard.component.html',
  styleUrls: ['./analytics-dashboard.component.css']
})
export class AnalyticsDashboardComponent implements OnInit, AfterViewInit {

  views: number = 0;
  totalNavClicks: number = 0;

  navClicks: any = {};
  navDaily: any[] = [];

  barChart: any;
  timelineChart: any;

  constructor(private analytics: AnalyticsService) {}

  ngOnInit(): void {

    /* -----------------------------
       Load total visitors
    ------------------------------ */
    this.analytics.getViews$().subscribe(v => {
      this.views = v ?? 0;
    });

    /* -----------------------------
       Load total nav clicks
    ------------------------------ */
    this.analytics.getNavClicks$().subscribe(c => {
      this.navClicks = c;
      this.totalNavClicks = Object.values(c).reduce((a: number, b: number) => a + b, 0);
      this.updateBarChart();
    });

    /* -----------------------------
       Load daily clicks
    ------------------------------ */
    this.analytics.getNavDaily$().subscribe(d => {
      this.navDaily = d;
      this.updateTimelineChart();
    });

  }

  ngAfterViewInit(): void {
    this.initBarChart();
    this.initTimelineChart();
  }


  /* ============================================================
     BAR CHART (Click Distribution)
  ============================================================ */

  initBarChart(): void {
    const ctx = document.getElementById('navBarChart') as HTMLCanvasElement;

    this.barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Home', 'About', 'Projects', 'Reviews', 'Contact', 'CV'],
        datasets: [
          {
            label: 'Clicks',
            data: [] as number[],
            backgroundColor: [
              '#7dffb2', '#62eaff', '#ffad6b',
              '#ff7bd5', '#d77dff', '#ffe062'
            ],
            borderRadius: 10
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        animation: { duration: 800 }
      }
    });
  }

  updateBarChart(): void {
    if (!this.barChart) return;

    const v = this.navClicks;

    this.barChart.data.datasets[0].data = [
      v.home, v.about, v.projects, v.reviews, v.contact, v.cv
    ];

    this.barChart.update();
  }


  /* ============================================================
     LINE CHART (Daily Timeline)
  ============================================================ */

  initTimelineChart(): void {
    const ctx = document.getElementById('navTimelineChart') as HTMLCanvasElement;

    this.timelineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [] as string[],
        datasets: [
          this.buildLineDataset('Home', '#7dffb2'),
          this.buildLineDataset('About', '#62eaff'),
          this.buildLineDataset('Projects', '#ffad6b'),
          this.buildLineDataset('Reviews', '#ff7bd5'),
          this.buildLineDataset('Contact', '#d77dff'),
          this.buildLineDataset('CV', '#ffe062')
        ]
      },
      options: {
        responsive: true,
        interaction: { mode: 'index', intersect: false },
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }

  updateTimelineChart(): void {
    if (!this.timelineChart) return;

    const labels = this.navDaily.map(d => d.date);
    this.timelineChart.data.labels = labels;

    const keys = ['home', 'about', 'projects', 'reviews', 'contact', 'cv'];

    keys.forEach((key, index) => {
      this.timelineChart.data.datasets[index].data =
        this.navDaily.map(d => d[key]);
    });

    this.timelineChart.update();
  }


  /* ============================================================
     DATASET GENERATOR (Fixes tension + typing errors)
  ============================================================ */

  buildLineDataset(label: string, color: string) {
    return {
      label,
      data: [] as number[],
      borderColor: color,
      backgroundColor: color + "33",
      borderWidth: 2,
      tension: 0.35,       // Correct placement in v4
      pointRadius: 3,
      pointHoverRadius: 5
    };
  }

}
