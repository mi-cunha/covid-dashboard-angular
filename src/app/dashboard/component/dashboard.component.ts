import { Component, OnInit, ViewChild } from '@angular/core';
import { DadosService } from '../services';
import { NgForm } from '@angular/forms'

declare var google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public junho: string = ''
  public julho: string = ''
  public agosto: string = ''
  public setembro: string = ''
  public formFlag: boolean = false

  private dados:any

  @ViewChild('infoForm', {static: true})infoForm?: NgForm

  constructor(private dadosService: DadosService) { }

  ngOnInit(): void {
    // this.dadosService.obterDados().subscribe(
    //   dados => {
    //     this.dados = dados;
    //     this.init();
    //   }
    // )
  }
  init(): void {
    if(typeof(google) !== "undefined"){
      google.charts.load('current', {'packages': ['corechart']});
      setTimeout(()=>{
        google.charts.setOnLoadCallback(this.exibirGraficos());
      }, 1000);
    }
  }

  exibirGraficos(): void {    
    // this.exibir3dPieChart();
    // this.exibirDonutChart();
    this.exibirAreaChart();    
  }

  // GRAFICOS 

  // exibir3dPieChart():void{
  //   const el = document.getElementById('3d_pie_chart');
  //   const chart = new google.visualization.PieChart(el);

  //   const opcoes = this.obterOpcoes();

  //   opcoes['is3D'] = true;

  //   chart.draw(this.obterDataTable(), opcoes);
  // }

  // exibirDonutChart():void{
  //   const el = document.getElementById('donut_chart');
  //   const chart = new google.visualization.PieChart(el);

  //   const opcoes = this.obterOpcoes();

  //   opcoes['pieHole'] = 0.4;

  //   chart.draw(this.obterDataTable(), opcoes);
  // }

  exibirAreaChart():void{
    const el = document.getElementById('area_chart');
    const chart = new google.visualization.AreaChart(el);

    const opcoes = this.obterOpcoes();

    chart.draw(this.obterDataTable(), opcoes);
  }

  // FIM DE GRÁFICO

  definirDados():void{
    let junho = parseInt(this.junho)
    let julho = parseInt(this.julho)
    let agosto = parseInt(this.agosto)
    let setembro = parseInt(this.setembro)
    this.formFlag = true
    this.dadosService.definirDados(junho, julho, agosto, setembro)
    this.dadosService.obterDados().subscribe(
      dados => {
        this.dados = dados;
        this.init();
      }
    )
  }

  obterDataTable(): any{
    const data = new google.visualization.DataTable();

    data.addColumn('string', 'Mês');
    data.addColumn('number', 'Quantidade');
    data.addRows(this.dados);

    return data
  }

  obterOpcoes(): any {
    return {
      'title': "Vendas no 1° semestre",
      'width': 500,
      'height': 300
    };
  }




}

