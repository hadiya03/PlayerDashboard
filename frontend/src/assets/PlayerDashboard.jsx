import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Activity, Brain, AlertTriangle, Clock, Moon, Heart, 
  Zap, Lightbulb, User, Shield, Pencil, Check, Camera, 
  FileDown, MessageSquare, Info 
} from "lucide-react";

export default function PlayerDashboard() {
  // FIXED: Changed initial state to null so it doesn't show 85% by default
  const [readiness, setReadiness] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [player, setPlayer] = useState({
    name: "Alex Johnson",
    position: "Forward",
    team: "Elite Strikers FC",
    number: "09",
    status: "Active",
    image: "" 
  });

  const [form, setForm] = useState({
    rpe: "", 
    duration: "", 
    sleep: "", 
    soreness: "", 
    tiredness: ""
  });

  const [submissions, setSubmissions] = useState([]);

  // FIXED: Set to empty array so no feedback shows if none is "sent"
  const [trainerMessages, setTrainerMessages] = useState([]);

  const handleProfileChange = (field, value) => {
    setPlayer(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPlayer(prev => ({ ...prev, image: imageUrl }));
    }
  };

  const handleInputChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const isFormComplete = Object.values(form).every(value => value.trim() !== "");

    if (!isFormComplete) {
      alert("Please fill in all details before submitting.");
      return;
    }

    // NEW LOGIC: Calculate a basic readiness score based on inputs
    const sleepWeight = (parseInt(form.sleep) / 10) * 100;
    const fatigueWeight = (10 - parseInt(form.tiredness)) * 10;
    const calculatedScore = Math.min(100, Math.round((sleepWeight + fatigueWeight) / 2));
    
    setReadiness(calculatedScore);

    const newEntry = {
      date: new Date().toLocaleString(),
      rpe: ${form.rpe}/10,
      tiredness: ${form.tiredness}/10,
      sleep: ${form.sleep}h,
      soreness: ${form.soreness}/10,
      duration: ${form.duration}m,
      readiness: ${calculatedScore}%
    };

    setSubmissions([newEntry, ...submissions]);
    setForm({ rpe: "", duration: "", sleep: "", soreness: "", tiredness: "" });
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const metrics = [
    { label: "Fatigue (RPE)", value: form.rpe ? ${form.rpe}/10 : "No data", icon: <Activity className="text-orange-400" size={20} /> },
    { label: "Tiredness", value: form.tiredness ? ${form.tiredness}/10 : "No data", icon: <Brain className="text-purple-400" size={20} /> },
    { label: "Injury Risk", value: submissions.length > 0 ? "Low" : "No data", icon: <AlertTriangle className="text-red-400" size={20} /> },
    { label: "Last Session", value: form.duration ? ${form.duration}m : "No data", icon: <Clock className="text-blue-400" size={20} /> },
    { label: "Sleep", value: form.sleep ? ${form.sleep}h : "No data", icon: <Moon className="text-indigo-400" size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-[#0b1221] text-white p-4 md:p-8 font-sans print:bg-white print:text-black">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-[#151c2e] border border-slate-800 p-6 rounded-2xl shadow-xl gap-4">
          <div className="flex items-center gap-5 w-full md:w-auto">
            <div className="relative group">
              <Avatar className="h-24 w-24 border-2 border-emerald-500/30">
                <AvatarImage src={player.image} className="object-cover" />
                <AvatarFallback className="bg-slate-800 text-slate-400"><User size={40} /></AvatarFallback>
              </Avatar>
              {isEditing && (
                <label className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full cursor-pointer transition-opacity">
                  <Camera className="text-white" size={24} />
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                </label>
              )}
            </div>

            <div className="flex-1 space-y-2 text-left">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold tracking-tight">{player.name}</h2>
                <span className="text-emerald-500 bg-emerald-500/10 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">{player.status}</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-400 text-sm">
                <span className="flex items-center gap-1.5 font-medium"><Shield size={14} className="text-emerald-500" /> {player.team}</span>
                <span className="text-slate-700">•</span>
                <span>{player.position}</span>
                <span className="text-slate-700">•</span>
                <span className="font-mono text-slate-500 uppercase">#{player.number}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 w-full md:w-auto print:hidden">
            <Button variant="outline" onClick={handleDownloadPDF} className="bg-slate-800 border-slate-700 hover:bg-slate-700 text-white flex-1 md:flex-none">
              <FileDown size={18} className="mr-2" /> Download Report
            </Button>
            <Button variant="outline" onClick={() => setIsEditing(!isEditing)} className="bg-slate-800 border-slate-700 hover:bg-slate-700 text-white md:flex-none">
              {isEditing ? <Check size={18} /> : <Pencil size={18} />}
            </Button>
          </div>
        </div>

        {/* Readiness & Trainer Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 bg-[#151c2e] border-slate-800 shadow-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Daily Readiness Score</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <div className="flex items-end justify-center gap-2">
                <span className="text-5xl font-black text-emerald-400">
                  {readiness !== null ? readiness : "--"}
                </span>
                <span className="text-xl text-slate-500 mb-1.5 font-bold">%</span>
              </div>
              <Progress value={readiness || 0} className="h-2 bg-slate-900" />
            </CardContent>
          </Card>

          <Card className="bg-[#151c2e] border-slate-800 shadow-xl overflow-hidden">
            <CardHeader className="border-b border-slate-800 py-3">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <MessageSquare size={16} className="text-emerald-500" /> Trainer Feedback
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-32 p-4 overflow-y-auto scrollbar-hide">
                <div className="space-y-4">
                  {trainerMessages.length > 0 ? (
                    trainerMessages.map((msg) => (
                      <div key={msg.id} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-emerald-500 uppercase">{msg.sender}</span>
                          <span className="text-[10px] text-slate-500">{msg.time}</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">{msg.text}</p>
                      </div>
                    ))
                  ) : (
                    <div className="h-full flex items-center justify-center text-slate-600 text-xs italic">
                      No feedback from trainer yet.
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((m, i) => (
            <Card key={i} className="bg-[#151c2e]/60 border-slate-800 p-6 text-center flex flex-col items-center justify-center">
              {m.icon}
              <span className="text-[10px] uppercase text-slate-500 font-bold mt-3 tracking-widest">{m.label}</span>
              <span className="text-lg font-bold text-white mt-1">{m.value}</span>
            </Card>
          ))}
        </div>

        {/* Input & Help Accordion */}
        <Card className="bg-[#151c2e] border-slate-800 shadow-xl print:hidden">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Post-Training Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['rpe', 'duration', 'sleep', 'soreness', 'tiredness'].map((f) => (
                <Input 
                  key={f}
                  placeholder={f === 'duration' ? "DURATION (MIN)" : f === 'sleep' ? "SLEEP (HR)" : ${f.toUpperCase()} (1-10)} 
                  className="bg-[#0b1221] border-slate-800 h-12 text-sm"
                  value={form[f]}
                  onChange={(e) => handleInputChange(f, e.target.value)}
                  type="number"
                />
              ))}
            </div>

            <Button onClick={handleSubmit} className="w-full bg-[#10b981] hover:bg-emerald-600 text-white font-black h-14">
              Submit Training Data
            </Button>

            <Accordion type="single" collapsible className="w-full border-t border-slate-800">
              <AccordionItem value="info" className="border-none">
                <AccordionTrigger className="text-slate-400 text-sm py-4 hover:no-underline">
                  <div className="flex items-center gap-2"><Info size={16} /> Metric Descriptions</div>
                </AccordionTrigger>
                <AccordionContent className="bg-slate-900/40 p-4 rounded-xl space-y-2 text-xs text-slate-400">
                  <p><b className="text-white">RPE:</b> Intensity from 1 (easy) to 10 (max).</p>
                  <p><b className="text-white">Duration:</b> Active training minutes.</p>
                  <p><b className="text-white">Sleep:</b> Hours rested.</p>
                  <p><b className="text-white">Soreness/Tiredness:</b> Physical/Mental fatigue (1-10).</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
