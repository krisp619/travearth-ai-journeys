import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/components/ui/use-toast";
import { getPromptTemplate, savePromptTemplate } from "@/lib/ai";
import { Save, RefreshCw } from "lucide-react";

const AISettings = () => {
  const [promptTemplate, setPromptTemplate] = useState(getPromptTemplate());
  const [temperature, setTemperature] = useState([0.7]);
  const [maxTokens, setMaxTokens] = useState("2000");
  const [modelVersion, setModelVersion] = useState("gpt-4");

  const savePrompt = () => {
    savePromptTemplate(promptTemplate);
    toast({ title: "Success", description: "AI prompt template saved successfully." });
  };

  const resetToDefault = () => {
    setPromptTemplate(getPromptTemplate());
    setTemperature([0.7]);
    setMaxTokens("2000");
    toast({ title: "Reset", description: "Settings restored to default values." });
  };

  const saveAllSettings = () => {
    savePromptTemplate(promptTemplate);
    toast({ 
      title: "All Settings Saved", 
      description: "AI configuration updated successfully.",
    });
  };

  return (
    <AdminLayout>
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-display font-bold">AI Settings</h2>
        <p className="text-muted-foreground">Configure AI model parameters and prompt templates.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Model Configuration</CardTitle>
            <CardDescription>Adjust AI model parameters for itinerary generation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="model">Model Version</Label>
              <Input
                id="model"
                value={modelVersion}
                onChange={(e) => setModelVersion(e.target.value)}
                placeholder="e.g., gpt-4"
              />
              <p className="text-xs text-muted-foreground">Current AI model being used</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="temperature">Temperature: {temperature[0]}</Label>
              <Slider
                id="temperature"
                value={temperature}
                onValueChange={setTemperature}
                min={0}
                max={1}
                step={0.1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Higher values make output more random, lower values more focused
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tokens">Max Tokens</Label>
              <Input
                id="tokens"
                type="number"
                value={maxTokens}
                onChange={(e) => setMaxTokens(e.target.value)}
                placeholder="2000"
              />
              <p className="text-xs text-muted-foreground">Maximum length of generated responses</p>
            </div>

            <Button onClick={saveAllSettings} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Save Model Settings
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Generation Statistics</CardTitle>
            <CardDescription>AI performance metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
              <span className="text-sm">Average Response Time</span>
              <span className="font-semibold">8.4s</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
              <span className="text-sm">Successful Generations</span>
              <span className="font-semibold">4,892</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
              <span className="text-sm">Failed Requests</span>
              <span className="font-semibold">28</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
              <span className="text-sm">Success Rate</span>
              <span className="font-semibold">99.4%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
              <span className="text-sm">Avg Tokens Used</span>
              <span className="font-semibold">1,542</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Prompt Template</CardTitle>
              <CardDescription>Customize the system prompt for itinerary generation</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={resetToDefault}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset to Default
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={promptTemplate}
            onChange={(e) => setPromptTemplate(e.target.value)}
            rows={15}
            className="font-mono text-sm"
            placeholder="Enter your AI prompt template here..."
          />
          <div className="flex gap-3">
            <Button onClick={savePrompt} className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              Save Prompt Template
            </Button>
            <Button variant="outline" onClick={() => setPromptTemplate("")}>
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
    </AdminLayout>
  );
};

export default AISettings;
