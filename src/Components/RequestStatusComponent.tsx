import { 
    CheckCircle, 
    AlertCircle, 
    Loader2, 
    XCircle 
  } from 'lucide-react';
  
  // Define the possible status types
  export type RequestStatus = 'success' | 'error' | 'loading' | 'idle' ;
  
  // Props interface for the component
  interface RequestStatusProps {
    status: RequestStatus;
    message: string;
    className?: string;
  }
  
  // Define status configurations
  const statusConfig = {
    success: {
      icon: CheckCircle,
      className: 'text-green-500',
      defaultMessage: 'Request completed successfully',
    },
    error: {
      icon: XCircle,
      className: 'text-red-500',
      defaultMessage: 'An error occurred',
    },
    loading: {
      icon: Loader2,
      className: 'text-blue-500 animate-spin',
      defaultMessage: 'Processing request...',
    },
    idle: {
      icon: AlertCircle,
      className: 'text-gray-500',
      defaultMessage: 'No request status',
    },
  };
  
  // Fixed function declaration using proper destructuring syntax
  export const RequestStatusComponent = ({status, message, className}: RequestStatusProps) => {
    const config = statusConfig[status];
    const Icon = config.icon;
  
    const displayMessage = message || config.defaultMessage;
  
    return (
      <div
        className={`flex fixed top-[12%] left-[20%] right-[20%] md:left-[34%] md:right-[34%] h-[40px] z-100000000000 items-center gap-2 p-1 min-w-[2rem]  rounded-sm bg-yellow-500 border ${className}`}
        role="status"
        aria-live="polite"
      >
        <Icon className={`w-5 h-5 ${config.className}`} />
        <span className="text-sm text-white">{displayMessage}</span>
      </div>
    );
  };