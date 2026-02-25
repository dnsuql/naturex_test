 "use client"

import createGlobe, { type COBEOptions } from "cobe"
import { useCallback, useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [34 / 255, 197 / 255, 94 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
}

function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string
  config?: COBEOptions
}) {
   let phi = 0
   let width = 0
   const canvasRef = useRef<HTMLCanvasElement>(null)
   const pointerInteracting = useRef<number | null>(null)
   const pointerInteractionMovement = useRef(0)
   const [r, setR] = useState(0)

   const updatePointerInteraction = (value: number | null) => {
     pointerInteracting.current = value
     if (canvasRef.current) {
       canvasRef.current.style.cursor = value ? "grabbing" : "grab"
     }
   }

   const updateMovement = (clientX: number) => {
     if (pointerInteracting.current !== null) {
       const delta = clientX - pointerInteracting.current
       pointerInteractionMovement.current = delta
       setR(delta / 200)
     }
   }

   const onRender = useCallback(
     (state: Record<string, any>) => {
       if (!pointerInteracting.current) phi += 0.002
       state.phi = phi + r
       state.width = width * 2
       state.height = width * 2
     },
     [r],
   )

   const onResize = () => {
     if (canvasRef.current) {
       width = canvasRef.current.offsetWidth
     }
   }

   useEffect(() => {
     window.addEventListener("resize", onResize)
     onResize()

     const globe = createGlobe(canvasRef.current!, {
       ...config,
       width: width * 2,
       height: width * 2,
       onRender,
     })

     setTimeout(() => {
       if (canvasRef.current) {
         canvasRef.current.style.opacity = "1"
       }
     })

     return () => {
       window.removeEventListener("resize", onResize)
       globe.destroy()
     }
   }, [config, onRender])

   return (
     <div
       className={cn(
        "relative mx-auto aspect-[1/1] w-full max-w-[600px]",
         className,
       )}
     >
       <canvas
         className={cn(
           "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]",
         )}
         ref={canvasRef}
         onPointerDown={(e) =>
           updatePointerInteraction(
             e.clientX - pointerInteractionMovement.current,
           )
         }
         onPointerUp={() => updatePointerInteraction(null)}
         onPointerOut={() => updatePointerInteraction(null)}
         onMouseMove={(e) => updateMovement(e.clientX)}
         onTouchMove={(e) =>
           e.touches[0] && updateMovement(e.touches[0].clientX)
         }
       />
     </div>
   )
 }

 export function Hero() {
   return (
    <section className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-x-4 top-20 z-10 text-center sm:top-24">
        <p className="text-[11px] font-medium tracking-[0.35em] text-emerald-500">
          NATUREX
        </p>
        <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          생물다양성 분석 결과를
          <span className="mt-1 block text-emerald-500">
            한 곳에서 공유하세요
          </span>
        </h1>
        <p className="mt-3 text-pretty text-xs leading-relaxed text-slate-500 sm:text-sm">
          NatureX는 현장 조사와 센서, 이미지에서 수집한 데이터를 분석해
          프로젝트별 인사이트 리포트로 정리하고,
          <br className="hidden sm:block" />
          팀과 파트너와 손쉽게 공유할 수 있는 공간을 제공합니다.
        </p>
      </div>

      <div className="relative mt-28 w-full max-w-[600px] sm:mt-32">
        <Globe />
      </div>
    </section>
   )
 }

