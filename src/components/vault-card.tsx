import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { HandCoins } from 'lucide-react'

export function VaultCard() {
  return (
    <Card className="p-3 mb-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-1.5 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-sm">
          <span className="font-medium">15%</span>
          <HandCoins className="w-4 h-4" />
        </div>
        <div>
          <span className="font-bold">$21.01M</span> <span className="text-xs text-muted-foreground">TVL</span>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#627EEA] rounded-full flex items-center justify-center shrink-0">
            <svg viewBox="0 0 784.37 1277.39" className="w-4 h-4 text-white" fill="currentColor">
              <path d="M392.07 0l-8.57 29.11v844.63l8.57 8.55 392.06-231.75z" />
              <path d="M392.07 0L0 650.54l392.07 231.75V472.33z" />
              <path d="M392.07 956.52l-4.83 5.89v300.87l4.83 14.1 392.3-552.49z" />
              <path d="M392.07 1277.38V956.52L0 724.89z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold">ETHVault</h3>
            <div className="flex gap-1.5 mt-0.5">
              <div className="flex items-center gap-1 text-xs">
                <div className="w-2 h-2 rounded-full bg-black" />
                <span>Base</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <div className="w-2 h-2 rounded-full bg-black" />
                <span>Berachain</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[60px] mb-3">
        <svg viewBox="0 0 400 100" className="w-full h-full stroke-primary fill-none">
          <path d="M0,90 Q50,80 100,70 T200,60 T300,40 T400,35" strokeWidth="2" />
        </svg>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <h4 className="text-xs font-medium mb-1.5">Protocols</h4>
          <div className="flex gap-1.5">
            <span className="bg-muted px-2 py-0.5 rounded text-xs">Base</span>
            <span className="bg-muted px-2 py-0.5 rounded text-xs">Berachain</span>
          </div>
        </div>
        <Button size="sm" className="h-8 self-end">
          Deposit
        </Button>
      </div>
    </Card>
  )
}
