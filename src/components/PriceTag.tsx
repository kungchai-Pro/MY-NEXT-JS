interface PriceTagProps {
  amount: number;
  className?: string;
}

const thbFormatter = new Intl.NumberFormat("th-TH", {
  style: "currency",
  currency: "THB",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function PriceTag({ amount, className = "" }: PriceTagProps) {
  return (
    <span className={className} aria-label={`${amount} บาท`}>
      {thbFormatter.format(amount)}
    </span>
  );
}
