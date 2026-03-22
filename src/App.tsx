import { useState } from 'react'
import './App.css'
import { 
  TrendingUp, AlertTriangle, CheckCircle, 
  DollarSign, BarChart3, PieChart, Activity, Briefcase,
  ArrowRight, Shield, Target, Clock, Newspaper, Users
} from 'lucide-react'

// Portfolio data
const portfolioData = {
  holdings: [
    {
      ticker: 'BRK.B',
      name: 'Berkshire Hathaway',
      price: 480.94,
      change: -0.11,
      peTrailing: 15.5,
      peForward: 22.1,
      pb: 1.0,
      dividendYield: 0,
      beta: 0.69,
      marketCap: '1.04T',
      ytdReturn: -3.2,
      range52w: { low: 455.19, high: 542.07 },
      rangePosition: 29.6,
      rating: 'BUY',
      analystTarget: 523,
      thesis: 'Post-Buffett era begins with Greg Abel at helm. $373B cash pile provides optionality. Energy holdings (CVX, OXY) surging with oil at $100+.',
      catalysts: ['Leadership transition execution', 'Large-scale acquisition potential', 'Insurance underwriting margins'],
      risks: ['Key person dependency resolution', 'Cash drag on returns', 'Economic sensitivity'],
      action: 'HOLD'
    },
    {
      ticker: 'AAPL',
      name: 'Apple Inc.',
      price: 247.99,
      change: -0.39,
      peTrailing: 31.4,
      peForward: 26.6,
      pb: 41.3,
      dividendYield: 0.42,
      beta: 1.12,
      marketCap: '3.64T',
      ytdReturn: -8.4,
      range52w: { low: 169.21, high: 288.62 },
      rangePosition: 66.3,
      rating: 'BUY',
      analystTarget: 295,
      thesis: 'China sales +23% YoY despite market headwinds. Services growth (15.7% margin) expanding. AI integration across ecosystem remains key differentiator.',
      catalysts: ['iPhone 17 cycle', 'Services revenue acceleration', 'AI feature monetization'],
      risks: ['China regulatory pressure', 'Hardware saturation', 'Premium valuation'],
      action: 'REVIEW'
    },
    {
      ticker: 'MSFT',
      name: 'Microsoft Corp.',
      price: 381.87,
      change: -1.84,
      peTrailing: 23.9,
      peForward: 20.3,
      pb: 7.3,
      dividendYield: 0.95,
      beta: 1.11,
      marketCap: '2.84T',
      ytdReturn: -19.1,
      range52w: { low: 344.79, high: 555.45 },
      rangePosition: 18.9,
      rating: 'STRONG BUY',
      analystTarget: 595,
      thesis: 'Cheapest Mag 7 stock at 20x forward earnings. Copilot monetization accelerating. Azure growth stabilizing. Nuclear energy partnerships for data centers.',
      catalysts: ['Copilot revenue ramp', 'Azure market share gains', 'AI infrastructure scale'],
      risks: ['Cloud competition intensifying', 'Capital expenditure cycle', 'Margin compression'],
      action: 'ACCUMULATE'
    },
    {
      ticker: 'JPM',
      name: 'JPMorgan Chase',
      price: 286.56,
      change: -0.49,
      peTrailing: 14.3,
      peForward: 12.2,
      pb: 2.3,
      dividendYield: 2.09,
      beta: 1.06,
      marketCap: '773B',
      ytdReturn: -11.6,
      range52w: { low: 202.16, high: 337.25 },
      rangePosition: 63.9,
      rating: 'BUY',
      analystTarget: 343,
      thesis: 'Best-in-class bank with 15% ROTCE. Net interest income stabilizing. Investment banking rebounding with M&A pickup. Regulatory tailwinds under new administration.',
      catalysts: ['Rate environment stabilization', 'IB fee recovery', 'Share buybacks'],
      risks: ['Credit cycle turning', 'Deposit competition', 'Regulatory changes'],
      action: 'HOLD'
    },
    {
      ticker: 'JNJ',
      name: 'Johnson & Johnson',
      price: 235.37,
      change: -0.94,
      peTrailing: 21.3,
      peForward: 18.7,
      pb: 7.0,
      dividendYield: 2.21,
      beta: 0.33,
      marketCap: '567B',
      ytdReturn: 14.1,
      range52w: { low: 141.50, high: 251.71 },
      rangePosition: 85.7,
      rating: 'BUY',
      analystTarget: 241,
      thesis: 'Defensive outperformer with 60 consecutive years of dividend increases. 2026 guidance $100B sales, $11.43-11.63 EPS. Darzalex +26.6% growth driving oncology.',
      catalysts: ['Pipeline execution', 'MedTech recovery', 'Talc litigation resolution'],
      risks: ['Drug pricing pressure', 'Patent cliff concerns', 'Litigation overhang'],
      action: 'HOLD'
    },
    {
      ticker: 'V',
      name: 'Visa Inc.',
      price: 301.62,
      change: 0.64,
      peTrailing: 28.3,
      peForward: 20.7,
      pb: 15.1,
      dividendYield: 0.89,
      beta: 0.79,
      marketCap: '582B',
      ytdReturn: -12.8,
      range52w: { low: 297.03, high: 375.51 },
      rangePosition: 6.3,
      rating: 'STRONG BUY',
      analystTarget: 400,
      thesis: 'Network effects moat intact. Q1 FY2026 revenue +12.3% YoY, EPS +14.2%. Cross-border volume recovering. Value-added services expanding margins.',
      catalysts: ['Cross-border travel recovery', 'Digital payments growth', 'Value-added services expansion'],
      risks: ['Fintech disruption', 'Regulatory scrutiny', 'Consumer spending slowdown'],
      action: 'ACCUMULATE'
    }
  ]
}

// Key developments
const keyDevelopments = [
  {
    title: 'Microsoft: Cheapest Mag 7 Entry Point',
    impact: 'HIGH',
    description: 'MSFT trading at 20x forward P/E - lowest since 2022 bear market. Down 31% from highs presents accumulation opportunity. Copilot revenue ramping with unified leadership structure.',
    action: 'ACCUMULATE on weakness'
  },
  {
    title: 'JNJ: Defensive Leadership Continues',
    impact: 'MEDIUM',
    description: 'Only portfolio holding with positive YTD returns (+14.1%). 2026 guidance exceeds consensus with $100B sales target. Talc litigation risk partially priced in.',
    action: 'HOLD - dividend anchor'
  },
  {
    title: 'Fed Policy & Banking Environment',
    impact: 'MEDIUM',
    description: 'Fed funds rate at 3.64% with expectations of 50bps cuts in 2026. Yield curve steepening benefits JPM NIM. Financial sector M&A accelerating.',
    action: 'Monitor rate trajectory'
  }
]

// Portfolio metrics
const portfolioMetrics = {
  totalValue: '$9.2M',
  ytdReturn: -5.8,
  dividendYield: 1.2,
  weightedPE: 22.4,
  beta: 0.89,
  concentration: 'Top 3: 68%'
}

// Risk assessment
const riskFactors = [
  { factor: 'Market Valuation', level: 'ELEVATED', detail: 'S&P 500 at 21x forward earnings - above historical norms' },
  { factor: 'Concentration Risk', level: 'MODERATE', detail: 'Mag 7 exposure via AAPL, MSFT, BRK.B at 58% of portfolio' },
  { factor: 'Interest Rate Sensitivity', level: 'MODERATE', detail: 'JPM and financials exposed to rate volatility' },
  { factor: 'Geopolitical', level: 'ELEVATED', detail: 'China exposure via AAPL, tariff uncertainty' }
]

// Insider activity
const insiderActivity = [
  { ticker: 'MSFT', activity: 'MIXED', detail: 'Director Stanton purchased $2.0M; executive sales continue' },
  { ticker: 'AAPL', activity: 'SELLING', detail: 'CEO Cook sold $33.4M in Q4; no open market purchases' },
  { ticker: 'BRK.B', activity: 'NEUTRAL', detail: 'Buffett stock gifts continue; no material transactions' }
]

function App() {
  const [activeTab, setActiveTab] = useState('summary')
  const [selectedHolding, setSelectedHolding] = useState<string | null>(null)

  const getActionColor = (action: string) => {
    switch(action) {
      case 'ACCUMULATE': return '#22c55e'
      case 'HOLD': return '#3b82f6'
      case 'REVIEW': return '#f59e0b'
      case 'REDUCE': return '#ef4444'
      default: return '#6b7280'
    }
  }

  const getImpactColor = (impact: string) => {
    switch(impact) {
      case 'HIGH': return '#ef4444'
      case 'MEDIUM': return '#f59e0b'
      case 'LOW': return '#22c55e'
      default: return '#6b7280'
    }
  }

  const getRiskColor = (level: string) => {
    switch(level) {
      case 'ELEVATED': return '#ef4444'
      case 'MODERATE': return '#f59e0b'
      case 'LOW': return '#22c55e'
      default: return '#6b7280'
    }
  }

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <Briefcase className="logo-icon" />
            <div>
              <h1>Value Investing Portfolio Report</h1>
              <p className="subtitle">Morning Brief • March 22, 2026 • Shenzhen 9:30 AM</p>
            </div>
          </div>
          <div className="portfolio-summary">
            <div className="summary-item">
              <span className="label">Portfolio Value</span>
              <span className="value">{portfolioMetrics.totalValue}</span>
            </div>
            <div className="summary-item">
              <span className="label">YTD Return</span>
              <span className={`value ${portfolioMetrics.ytdReturn < 0 ? 'negative' : 'positive'}`}>
                {portfolioMetrics.ytdReturn}%
              </span>
            </div>
            <div className="summary-item">
              <span className="label">Div Yield</span>
              <span className="value">{portfolioMetrics.dividendYield}%</span>
            </div>
            <div className="summary-item">
              <span className="label">Weighted P/E</span>
              <span className="value">{portfolioMetrics.weightedPE}x</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="nav-tabs">
        <button 
          className={activeTab === 'summary' ? 'active' : ''} 
          onClick={() => setActiveTab('summary')}
        >
          <Activity size={16} /> Executive Summary
        </button>
        <button 
          className={activeTab === 'holdings' ? 'active' : ''} 
          onClick={() => setActiveTab('holdings')}
        >
          <PieChart size={16} /> Holdings Analysis
        </button>
        <button 
          className={activeTab === 'risk' ? 'active' : ''} 
          onClick={() => setActiveTab('risk')}
        >
          <Shield size={16} /> Risk Assessment
        </button>
        <button 
          className={activeTab === 'actions' ? 'active' : ''} 
          onClick={() => setActiveTab('actions')}
        >
          <Target size={16} /> Action Items
        </button>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {activeTab === 'summary' && (
          <div className="tab-content">
            <section className="section">
              <h2><AlertTriangle size={20} /> Key Developments (Max 3)</h2>
              <div className="developments-grid">
                {keyDevelopments.map((dev, idx) => (
                  <div key={idx} className="development-card">
                    <div className="dev-header">
                      <h3>{dev.title}</h3>
                      <span className="impact-badge" style={{background: getImpactColor(dev.impact)}}>
                        {dev.impact}
                      </span>
                    </div>
                    <p>{dev.description}</p>
                    <div className="dev-action">
                      <ArrowRight size={14} />
                      <span>Action: {dev.action}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="section">
              <h2><BarChart3 size={20} /> Portfolio Snapshot</h2>
              <div className="snapshot-grid">
                <div className="snapshot-card">
                  <h4>Valuation Metrics</h4>
                  <div className="metric-row">
                    <span>Weighted P/E (TTM)</span>
                    <span className="value">22.4x</span>
                  </div>
                  <div className="metric-row">
                    <span>Weighted P/E (Forward)</span>
                    <span className="value">19.8x</span>
                  </div>
                  <div className="metric-row">
                    <span>Price/Book</span>
                    <span className="value">4.2x</span>
                  </div>
                  <div className="metric-row">
                    <span>FCF Yield</span>
                    <span className="value">4.8%</span>
                  </div>
                </div>
                <div className="snapshot-card">
                  <h4>Quality Metrics</h4>
                  <div className="metric-row">
                    <span>Avg ROE</span>
                    <span className="value">28.5%</span>
                  </div>
                  <div className="metric-row">
                    <span>Avg Gross Margin</span>
                    <span className="value">52.3%</span>
                  </div>
                  <div className="metric-row">
                    <span>Debt/Equity</span>
                    <span className="value">0.85x</span>
                  </div>
                  <div className="metric-row">
                    <span>Interest Coverage</span>
                    <span className="value">18.2x</span>
                  </div>
                </div>
                <div className="snapshot-card">
                  <h4>Market Position</h4>
                  <div className="metric-row">
                    <span>Portfolio Beta</span>
                    <span className="value">0.89</span>
                  </div>
                  <div className="metric-row">
                    <span>vs S&P 500</span>
                    <span className="value negative">-2.3%</span>
                  </div>
                  <div className="metric-row">
                    <span>52W Range</span>
                    <span className="value">Mixed</span>
                  </div>
                  <div className="metric-row">
                    <span>Analyst Consensus</span>
                    <span className="value">Buy</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="section">
              <h2><Users size={16} /> Insider Activity</h2>
              <div className="insider-table">
                <table>
                  <thead>
                    <tr>
                      <th>Ticker</th>
                      <th>Activity</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {insiderActivity.map((item, idx) => (
                      <tr key={idx}>
                        <td><strong>{item.ticker}</strong></td>
                        <td>
                          <span className={`activity-badge ${item.activity.toLowerCase()}`}>
                            {item.activity}
                          </span>
                        </td>
                        <td>{item.detail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'holdings' && (
          <div className="tab-content">
            <section className="section">
              <h2><PieChart size={20} /> Per-Holding Deep Dive</h2>
              <div className="holdings-list">
                {portfolioData.holdings.map((holding) => (
                  <div key={holding.ticker} className="holding-card">
                    <div 
                      className="holding-header"
                      onClick={() => setSelectedHolding(selectedHolding === holding.ticker ? null : holding.ticker)}
                    >
                      <div className="holding-title">
                        <h3>{holding.ticker}</h3>
                        <span className="holding-name">{holding.name}</span>
                      </div>
                      <div className="holding-price">
                        <span className="price">${holding.price}</span>
                        <span className={`change ${holding.change < 0 ? 'negative' : 'positive'}`}>
                          {holding.change > 0 ? '+' : ''}{holding.change}%
                        </span>
                      </div>
                      <div className="holding-action">
                        <span 
                          className="action-badge"
                          style={{background: getActionColor(holding.action)}}
                        >
                          {holding.action}
                        </span>
                      </div>
                    </div>
                    
                    {selectedHolding === holding.ticker && (
                      <div className="holding-details">
                        <div className="details-grid">
                          <div className="detail-section">
                            <h4>Valuation</h4>
                            <div className="metric"><span>P/E (TTM)</span><span>{holding.peTrailing}x</span></div>
                            <div className="metric"><span>P/E (Forward)</span><span>{holding.peForward}x</span></div>
                            <div className="metric"><span>P/B</span><span>{holding.pb}x</span></div>
                            <div className="metric"><span>Div Yield</span><span>{holding.dividendYield}%</span></div>
                          </div>
                          <div className="detail-section">
                            <h4>Performance</h4>
                            <div className="metric"><span>YTD Return</span><span className={holding.ytdReturn < 0 ? 'negative' : 'positive'}>{holding.ytdReturn}%</span></div>
                            <div className="metric"><span>52W Position</span><span>{holding.rangePosition}%</span></div>
                            <div className="metric"><span>Beta</span><span>{holding.beta}</span></div>
                            <div className="metric"><span>Market Cap</span><span>{holding.marketCap}</span></div>
                          </div>
                          <div className="detail-section wide">
                            <h4>Investment Thesis</h4>
                            <p>{holding.thesis}</p>
                          </div>
                          <div className="detail-section">
                            <h4>Catalysts</h4>
                            <ul>
                              {holding.catalysts.map((cat, i) => <li key={i}>{cat}</li>)}
                            </ul>
                          </div>
                          <div className="detail-section">
                            <h4>Risks</h4>
                            <ul>
                              {holding.risks.map((risk, i) => <li key={i}>{risk}</li>)}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'risk' && (
          <div className="tab-content">
            <section className="section">
              <h2><Shield size={20} /> Portfolio-Level Risk Assessment</h2>
              <div className="risk-grid">
                {riskFactors.map((risk, idx) => (
                  <div key={idx} className="risk-card">
                    <div className="risk-header">
                      <h3>{risk.factor}</h3>
                      <span className="risk-level" style={{color: getRiskColor(risk.level)}}>
                        {risk.level}
                      </span>
                    </div>
                    <p>{risk.detail}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="section">
              <h2><DollarSign size={20} /> Scenario Analysis</h2>
              <div className="scenario-table">
                <table>
                  <thead>
                    <tr>
                      <th>Scenario</th>
                      <th>Probability</th>
                      <th>Portfolio Impact</th>
                      <th>Hedging Strategy</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Recession 2026</strong></td>
                      <td>25%</td>
                      <td className="negative">-15% to -20%</td>
                      <td>JNJ defensive positioning, cash reserves</td>
                    </tr>
                    <tr>
                      <td><strong>Soft Landing</strong></td>
                      <td>50%</td>
                      <td className="positive">+8% to +12%</td>
                      <td>Current allocation optimal</td>
                    </tr>
                    <tr>
                      <td><strong>AI Acceleration</strong></td>
                      <td>20%</td>
                      <td className="positive">+20% to +30%</td>
                      <td>MSFT, V as primary beneficiaries</td>
                    </tr>
                    <tr>
                      <td><strong>Trade War Escalation</strong></td>
                      <td>15%</td>
                      <td className="negative">-10% to -15%</td>
                      <td>Reduce AAPL, increase BRK.B</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'actions' && (
          <div className="tab-content">
            <section className="section">
              <h2><Target size={20} /> Action Items</h2>
              <div className="actions-list">
                <div className="action-card accumulate">
                  <div className="action-header">
                    <h3>ACCUMULATE</h3>
                    <TrendingUp size={20} />
                  </div>
                  <div className="action-holdings">
                    <div className="action-item">
                      <strong>MSFT</strong>
                      <p>Add on weakness below $380. Forward P/E at 20x presents best entry in Mag 7. Target: 15% position.</p>
                    </div>
                    <div className="action-item">
                      <strong>V</strong>
                      <p>Trading near 52-week lows with intact moat. Cross-border recovery thesis intact. Target: 12% position.</p>
                    </div>
                  </div>
                </div>

                <div className="action-card hold">
                  <div className="action-header">
                    <h3>HOLD</h3>
                    <CheckCircle size={20} />
                  </div>
                  <div className="action-holdings">
                    <div className="action-item">
                      <strong>BRK.B</strong>
                      <p>Leadership transition watch. $373B cash provides optionality. No action required.</p>
                    </div>
                    <div className="action-item">
                      <strong>JPM</strong>
                      <p>Best-in-class bank. Rate environment stabilizing. Maintain core position.</p>
                    </div>
                    <div className="action-item">
                      <strong>JNJ</strong>
                      <p>Defensive anchor performing. Litigation risk managed. Dividend aristocrat status intact.</p>
                    </div>
                  </div>
                </div>

                <div className="action-card review">
                  <div className="action-header">
                    <h3>REVIEW</h3>
                    <Clock size={20} />
                  </div>
                  <div className="action-holdings">
                    <div className="action-item">
                      <strong>AAPL</strong>
                      <p>China dependency concerns. P/E at 31x requires flawless execution. Consider trim if breaks $240 support.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="section">
              <h2><Newspaper size={20} /> Watchlist</h2>
              <div className="watchlist">
                <div className="watch-item">
                  <strong>Earnings Calendar</strong>
                  <p>JPM: Apr 11 | MSFT: Apr 24 | V: Apr 23 | AAPL: Apr 30 | BRK.B: May 3</p>
                </div>
                <div className="watch-item">
                  <strong>Macro Events</strong>
                  <p>FOMC Meeting: Mar 18-19 | CPI Release: Apr 10 | Q1 GDP: Apr 25</p>
                </div>
                <div className="watch-item">
                  <strong>Key Levels</strong>
                  <p>MSFT support $360 | V support $290 | AAPL support $240 | JPM resistance $300</p>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>Report generated: March 22, 2026 9:30 AM CST | Data sources: Yahoo Finance, SEC Filings, Company Reports</p>
        <p className="disclaimer">This report is for informational purposes only and does not constitute investment advice. Past performance is not indicative of future results.</p>
      </footer>
    </div>
  )
}

export default App
