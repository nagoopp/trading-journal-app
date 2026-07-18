'use client';

import { Trophy } from '@/lib/types';

interface TradingData {
  data: any[];
  trophies: Trophy[];
  exportedAt: string;
  appVersion: string;
}

export class DataManager {
  static exportToJSON(tradingData: any[], trophies: Trophy[]): void {
    const exportData: TradingData = {
      data: tradingData,
      trophies: trophies,
      exportedAt: new Date().toISOString(),
      appVersion: '1.0.0',
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `trading-journal-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  static exportToCSV(tradingData: any[]): void {
    let csv = 'Tanggal,Pasangan,Arah,Hasil,P/L,Entry Time,Alasan\n';
    
    tradingData.forEach(day => {
      day.transactions?.forEach((tx: any) => {
        csv += `"${day.date}","${tx.pair}","${tx.direction}","${tx.result}","${tx.profitLoss}","${tx.entryTime}","${tx.reason}"\n`;
      });
    });

    const csvBlob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(csvBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `trading-journal-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  static importFromJSON(file: File): Promise<TradingData> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string) as TradingData;
          resolve(data);
        } catch (error) {
          reject(new Error('Format file tidak valid'));
        }
      };
      reader.onerror = () => reject(new Error('Gagal membaca file'));
      reader.readAsText(file);
    });
  }

  static generateReport(tradingData: any[]): string {
    const totalTrades = tradingData.reduce((sum, day) => sum + (day.transactions?.length || 0), 0);
    const totalProfit = tradingData.reduce((sum, day) => {
      return sum + (day.transactions?.reduce((daySum: number, tx: any) => daySum + tx.profitLoss, 0) || 0);
    }, 0);

    const winTrades = tradingData.reduce((sum, day) => {
      return sum + (day.transactions?.filter((tx: any) => tx.result === 'Win').length || 0);
    }, 0);

    const winRate = totalTrades > 0 ? ((winTrades / totalTrades) * 100).toFixed(2) : 0;

    return `
LAPORAN TRADING JOURNAL
=======================
Tanggal Laporan: ${new Date().toLocaleDateString('id-ID')}

STATISTIK RINGKAS:
- Total Transaksi: ${totalTrades}
- Total Profit/Loss: $${totalProfit}
- Transaksi Menang: ${winTrades}
- Win Rate: ${winRate}%
- Days Traded: ${tradingData.filter(d => (d.transactions?.length || 0) > 0).length}

DETAIL PER HARI:
${tradingData.map(day => {
  if (!day.transactions || day.transactions.length === 0) return '';
  const dayProfit = day.transactions.reduce((sum: number, tx: any) => sum + tx.profitLoss, 0);
  return `
${day.date}:
  - Transaksi: ${day.transactions.length}
  - Profit: $${dayProfit}
  - Win Rate: ${((day.transactions.filter((tx: any) => tx.result === 'Win').length / day.transactions.length) * 100).toFixed(0)}%`;
}).join('\n')}
    `;
  }
}

export default DataManager;
