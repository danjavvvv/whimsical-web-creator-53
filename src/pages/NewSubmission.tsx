import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Upload, FileCode, Check, Loader } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from '@/contexts/AuthContext';

const NewSubmission = () => {
  const [submissionLabel, setSubmissionLabel] = useState('ACME_Q2_Batch_2');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const navigate = useNavigate();
  
  const { supplierID } = useAuth();

  useEffect(() => {
    console.log("New Submission page - supplierID from context:", supplierID);
  }, [supplierID]);

  const handleDownloadTemplate = async () => {
    setIsDownloading(true);
    
    try {
      const response = await fetch('https://danjaved008.app.n8n.cloud/webhook-test/e6369e97-7e71-4787-b1ef-54d8d456874f');
      
      if (!response.ok) {
        throw new Error('Failed to download template');
      }
      
      const blob = await response.blob();
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'las_submission_template.csv';
      document.body.appendChild(a);
      a.click();
      
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success("Template Downloaded", {
        description: "CSV template has been downloaded successfully."
      });
    } catch (error) {
      console.error('Download error:', error);
      toast.error("Download Failed", {
        description: "Could not download the CSV template. Please try again."
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast.error("Missing File", {
        description: "Please upload a completed CSV file before submitting."
      });
      return;
    }

    setIsSubmitting(true);
    
    toast.info("Processing Submission", {
      description: "Uploading and analyzing your data. Please wait..."
    });
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('submissionLabel', submissionLabel);
      
      if (supplierID) {
        formData.append('supplierid', supplierID);
        console.log("Including supplierid in submission:", supplierID);
      } else {
        console.warn("No supplierid available for submission - using placeholder");
        formData.append('supplierid', 'placeholder-id');
      }
      
      const response = await fetch('https://danjaved008.app.n8n.cloud/webhook-test/ec92ebad-901c-43d5-bc72-7063593ddc2c', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to upload CSV file');
      }
      
      const results = await response.json();
      
      sessionStorage.setItem('submissionResults', JSON.stringify(results));
      
      toast.success("Submission Successful", {
        description: "Your LAS submission has been processed successfully."
      });
      
      navigate(`/submission-results/${results[0]?.submission_id || 'latest'}`);
      
    } catch (error) {
      console.error('Upload error:', error);
      toast.error("Submission Failed", {
        description: "Could not submit your CSV file. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        <Button 
          variant="outline" 
          onClick={() => navigate('/supplier-dashboard')} 
          className="mb-6"
        >
          Back to Dashboard
        </Button>
        
        <Card className="w-full shadow-md animate-fade-in">
          <CardHeader>
            <CardTitle className="text-2xl">New LAS Submission</CardTitle>
            <CardDescription>
              Complete the steps below to submit your LAS data for the current period.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="submission-label">Submission Label</Label>
                  <Input
                    id="submission-label"
                    value={submissionLabel}
                    onChange={(e) => setSubmissionLabel(e.target.value)}
                    className="w-full"
                    required
                  />
                </div>
                
                <div className="space-y-4 pt-4">
                  <div className="space-y-2 border rounded-lg p-4 bg-muted/10">
                    <div className="font-medium text-lg flex items-center gap-2">
                      <div className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm">1</div>
                      Download Template
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Download our standard CSV template to fill in your LAS data.
                    </p>
                    <Button
                      type="button"
                      onClick={handleDownloadTemplate}
                      className="flex items-center gap-2"
                      disabled={isDownloading}
                    >
                      {isDownloading ? <Loader className="animate-spin" size={18} /> : <Download size={18} />}
                      {isDownloading ? 'Downloading...' : 'Download CSV Template'}
                    </Button>
                  </div>
                  
                  <div className="space-y-2 border rounded-lg p-4 bg-muted/10">
                    <div className="font-medium text-lg flex items-center gap-2">
                      <div className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm">2</div>
                      Upload Completed CSV
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Upload your completed CSV file with all required data.
                    </p>
                    
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-center gap-2">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => document.getElementById('file-upload')?.click()}
                          className="relative"
                        >
                          <Upload size={18} className="mr-2" />
                          Choose File
                        </Button>
                        <span className="text-sm text-muted-foreground">
                          {file ? file.name : 'No file chosen'}
                        </span>
                      </div>
                      
                      <input
                        id="file-upload"
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      
                      {file && (
                        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-2 rounded">
                          <FileCode size={16} />
                          <span>{file.name}</span>
                          <Check size={16} className="ml-auto" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button 
                  type="submit" 
                  className="w-full py-6 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="animate-spin mr-2" />
                      Processing...
                    </>
                  ) : 'Submit LAS Data'}
                </Button>
              </div>
            </form>
          </CardContent>
          
          <CardFooter className="flex flex-col items-start text-sm text-muted-foreground">
            <p>Need help? Contact support at support@silencesource.com</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default NewSubmission;
