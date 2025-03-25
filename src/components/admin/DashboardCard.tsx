
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  value: string | number;
  subtitle: string;
  buttonText: string;
  buttonIcon?: LucideIcon;
  loading?: boolean;
  loadingText?: string;
  extraInfo?: string;
  extraInfoColor?: string;
  onClick: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  icon: Icon,
  value,
  subtitle,
  buttonText,
  buttonIcon: ButtonIcon,
  loading = false,
  loadingText = 'Loading...',
  extraInfo,
  extraInfoColor = 'text-amber-500',
  onClick,
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Icon className="mr-2 h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-semibold">{value}</p>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
        {extraInfo && (
          <p className={`text-sm font-medium ${extraInfoColor} mt-1`}>
            {extraInfo}
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          size="sm" 
          variant="outline" 
          className="w-full"
          onClick={onClick}
          disabled={loading}
        >
          {loading ? (
            <>
              {ButtonIcon && <ButtonIcon className="mr-2 h-4 w-4 animate-spin" />}
              {loadingText}
            </>
          ) : (
            <>
              {ButtonIcon && <ButtonIcon className="mr-2 h-4 w-4" />}
              {buttonText}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DashboardCard;
