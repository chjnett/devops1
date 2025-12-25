import { motion, useInView } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import { useRef, useState, useEffect } from 'react'
import { TrendingUp, Zap, Clock, DollarSign } from 'lucide-react'

const dataPoints = [
  { month: 'Month 1', before: 45, after: 50 },
  { month: 'Month 2', before: 48, after: 62 },
  { month: 'Month 3', before: 50, after: 75 },
  { month: 'Month 4', before: 47, after: 85 },
  { month: 'Month 5', before: 52, after: 92 },
  { month: 'Month 6', before: 50, after: 98 },
]

const metrics = [
  {
    icon: TrendingUp,
    label: 'Efficiency Increase',
    value: '+96%',
    description: '도입 6개월 후'
  },
  {
    icon: Clock,
    label: 'Time Saved',
    value: '65%',
    description: '자동화로 절감'
  },
  {
    icon: DollarSign,
    label: 'Cost Reduction',
    value: '40%',
    description: '운영 비용 감소'
  },
]

export default function EfficiencyChart() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [animatedValues, setAnimatedValues] = useState(dataPoints.map(() => ({ before: 0, after: 0 })))

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const interval = duration / steps

      let currentStep = 0
      const timer = setInterval(() => {
        currentStep++
        const progress = currentStep / steps

        setAnimatedValues(
          dataPoints.map(point => ({
            before: point.before * progress,
            after: point.after * progress,
          }))
        )

        if (currentStep >= steps) {
          clearInterval(timer)
          setAnimatedValues(dataPoints)
        }
      }, interval)

      return () => clearInterval(timer)
    }
  }, [isInView])

  // SVG 좌표 계산
  const width = 600
  const height = 300
  const padding = 40
  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2

  const getX = (index) => padding + (chartWidth / (dataPoints.length - 1)) * index
  const getY = (value) => height - padding - (chartHeight * value / 100)

  // 경로 생성
  const createPath = (data) => {
    return data.map((point, index) => {
      const x = getX(index)
      const y = getY(point)
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
    }).join(' ')
  }

  const beforePath = createPath(animatedValues.map(d => d.before))
  const afterPath = createPath(animatedValues.map(d => d.after))

  return (
    <div ref={ref} className="relative">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Proven <span className="text-gray-500">Results</span>
        </h2>
        <p className="text-gray-500 text-lg">
          기술 도입 후 실제 효율성 증가 지표
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="bento-card p-8 bg-[#161616]">
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="w-full h-auto"
              style={{ maxHeight: '300px' }}
            >
              {/* Grid Lines */}
              {[0, 25, 50, 75, 100].map((value) => (
                <g key={value}>
                  <line
                    x1={padding}
                    y1={getY(value)}
                    x2={width - padding}
                    y2={getY(value)}
                    stroke="#262626"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={padding - 10}
                    y={getY(value) + 5}
                    fill="#666"
                    fontSize="12"
                    textAnchor="end"
                  >
                    {value}%
                  </text>
                </g>
              ))}

              {/* X-axis labels */}
              {dataPoints.map((point, index) => (
                <text
                  key={index}
                  x={getX(index)}
                  y={height - padding + 25}
                  fill="#666"
                  fontSize="11"
                  textAnchor="middle"
                >
                  {point.month.replace('Month ', 'M')}
                </text>
              ))}

              {/* Before Line */}
              <motion.path
                d={beforePath}
                fill="none"
                stroke="#666"
                strokeWidth="2"
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 0.5 } : {}}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />

              {/* After Line (Gradient) */}
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#fff" />
                  <stop offset="100%" stopColor="#999" />
                </linearGradient>
              </defs>

              <motion.path
                d={afterPath}
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 2, ease: 'easeInOut', delay: 0.3 }}
              />

              {/* Data Points - After */}
              {animatedValues.map((point, index) => (
                <motion.circle
                  key={`after-${index}`}
                  cx={getX(index)}
                  cy={getY(point.after)}
                  r="5"
                  fill="#fff"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                />
              ))}

              {/* Data Points - Before */}
              {animatedValues.map((point, index) => (
                <circle
                  key={`before-${index}`}
                  cx={getX(index)}
                  cy={getY(point.before)}
                  r="3"
                  fill="#666"
                  opacity="0.5"
                />
              ))}
            </svg>

            {/* Legend */}
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-0.5 bg-gray-600" style={{ borderStyle: 'dashed' }} />
                <span className="text-xs text-gray-500">도입 전</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-0.5 bg-white" />
                <span className="text-xs text-white">도입 후</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Metrics */}
        <div className="space-y-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <Tilt
                  tiltMaxAngleX={5}
                  tiltMaxAngleY={5}
                  scale={1.02}
                  transitionSpeed={2000}
                  glareEnable={true}
                  glareMaxOpacity={0.1}
                  glareColor="#ffffff"
                  glareBorderRadius="24px"
                >
                  <div className="bento-card p-6 bg-[#161616] flex items-start gap-4">
                    <div className="p-3 bg-[#1F1F1F] rounded-xl">
                      <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-3 mb-1">
                        <motion.span
                          className="text-3xl font-bold text-white"
                          initial={{ opacity: 0, scale: 0.5 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                          viewport={{ once: true }}
                        >
                          {metric.value}
                        </motion.span>
                      </div>
                      <h3 className="text-base font-semibold mb-1">{metric.label}</h3>
                      <p className="text-sm text-gray-500">{metric.description}</p>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            )
          })}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="pt-4"
          >
            <p className="text-gray-400 text-sm mb-4">
              실제 고객사 평균 데이터 기반
            </p>
            <div className="flex items-center gap-2 text-white group cursor-pointer">
              <span className="font-medium">상세 케이스 스터디 보기</span>
              <Zap className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
