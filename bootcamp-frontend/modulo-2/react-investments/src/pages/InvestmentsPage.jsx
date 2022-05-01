import { Header, Main, Investments, Investment, Report } from "../components";
import { data } from "../data/investments";
import { format } from "date-fns";

const { investments, reports } = data;

function incomeCalc(investments) {
  investments.map((investment) => {
    let totalIncome = 0;
    investment.reports.map((report, index) => {
      if (index !== 0) {
        let lastMonthValue = parseFloat(investment.reports[index - 1].value);
        let currentMonthValue = parseFloat(report.value);
        report.income = +(currentMonthValue - lastMonthValue).toFixed(2);
        report.profit = +(report.income / lastMonthValue).toFixed(2);
        totalIncome += report.income;
      } else {
        report.income = 0;
        report.profit = 0;
      }

      return report;
    });
    investment.totalIncome = totalIncome.toFixed(2);
    investment.totalProfit = (
      (investment.totalIncome / investment.reports[0].value) *
      100
    ).toFixed(2);
    return investment;
  });
}

function mergeData(investments, reports) {
  investments.map((investment) => {
    let reportList = [];
    reports
      .map((report) => {
        if (report.investmentId === investment.id) {
          // parse date
          let date = new Date(`${report.month}/01/${report.year}`);
          report.date = format(date, "MMM/yyyy");
          report.value = parseFloat(report.value).toFixed(2);
          // merge
          reportList.push(report);
        }
        return report;
      })
      .sort((a, b) => a.month - b.month);
    investment.reports = reportList;
    return investment;
  });
}
mergeData(investments, reports);
incomeCalc(investments);

export default function InvestmentsPage() {
  return (
    <div>
      <Header />
      <Main>
        <Investments>
          {investments.map((investment) => {
            return (
              <Investment
                key={investment.id}
                description={investment.description}
                totalIncome={investment.totalIncome}
                totalProfit={investment.totalProfit}
              >
                {investment.reports.map((report) => {
                  return <Report key={report.id}>{report}</Report>;
                })}
              </Investment>
            );
          })}
        </Investments>
      </Main>
    </div>
  );
}
