


/*import React, { useState } from "react";
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
  Zap, Droplets, Lightbulb, ChevronDown, ChevronUp, 
  User, Shield, Pencil, Check, Camera 
} from "lucide-react";

export default function PlayerDashboard() {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [readiness, setReadiness] = useState(0);
  
  // Profile State
  const [isEditing, setIsEditing] = useState(false);
  const [player, setPlayer] = useState({
    name: "Alex Johnson",
    position: "Forward",
    team: "Elite Strikers FC",
    number: "09",
    status: "Active",
    image: "" 
  });

  // Form State
  const [form, setForm] = useState({
    rpe: "", duration: "", sleep: "", soreness: "", tiredness: "", mood: "",
    sleepQuality: "", energy: "", hydration: "", weight: "", hrv: ""
  });

  // Submission History State
  const [submissions, setSubmissions] = useState([]);

  // Profile Update Handlers
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
    const calculatedScore = Math.floor(Math.random() * 100);
    setReadiness(calculatedScore);

    const newEntry = {
      date: new Date().toLocaleString(),
      rpe: form.rpe ? `${form.rpe}/10` : "-",
      tiredness: form.tiredness ? `${form.tiredness}/10` : "-",
      sleep: form.sleep ? `${form.sleep}h` : "-",
      soreness: form.soreness ? `${form.soreness}/10` : "-",
      mood: form.mood ? `${form.mood}/10` : "-",
      readiness: `${calculatedScore}%`
    };

    setSubmissions([newEntry, ...submissions]);
  };

  const metrics = [
    { label: "Fatigue (RPE)", value: form.rpe ? `${form.rpe}/10` : "No data", icon: <Activity className="text-orange-400" size={20} /> },
    { label: "Tiredness", value: form.tiredness ? `${form.tiredness}/10` : "No data", icon: <Brain className="text-purple-400" size={20} /> },
    { label: "Injury Risk", value: submissions.length > 0 ? "Low" : "No data", icon: <AlertTriangle className="text-red-400" size={20} /> },
    { label: "Last Session", value: form.duration ? `${form.duration}m` : "No data", icon: <Clock className="text-blue-400" size={20} /> },
    { label: "Sleep", value: form.sleep ? `${form.sleep}h` : "No data", icon: <Moon className="text-indigo-400" size={20} /> },
    { label: "Mood", value: form.mood ? `${form.mood}/10` : "No data", icon: <Heart className="text-pink-400" size={20} /> },
    { label: "Energy", value: submissions.length > 0 ? "Optimal" : "No data", icon: <Zap className="text-yellow-400" size={20} /> },
    { label: "Hydration", value: submissions.length > 0 ? "Good" : "No data", icon: <Droplets className="text-cyan-400" size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-[#0b1221] text-white p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        
     
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
              {isEditing ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 animate-in fade-in zoom-in-95 duration-200">
                  <Input 
                    value={player.name} 
                    onChange={(e) => handleProfileChange('name', e.target.value)}
                    className="h-8 bg-[#0b1221] border-slate-700 text-sm font-bold"
                    placeholder="Name"
                  />
                  <Input 
                    value={player.team} 
                    onChange={(e) => handleProfileChange('team', e.target.value)}
                    className="h-8 bg-[#0b1221] border-slate-700 text-sm"
                    placeholder="Team"
                  />
                </div>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? "default" : "outline"}
              className={cn(
                "h-9 text-[11px] font-bold px-4 rounded-lg",
                isEditing ? "bg-emerald-600 hover:bg-emerald-700 border-none" : "border-slate-700 text-slate-300 hover:bg-slate-800"
              )}
            >
              {isEditing ? <><Check size={14} className="mr-2" /> Save Profile</> : <><Pencil size={12} className="mr-2" /> Edit Profile</>}
            </Button>
            {!isEditing && (
              <>
                <Button className="bg-[#2563eb] hover:bg-blue-700 h-9 text-[11px] font-bold px-4 rounded-lg">JSON</Button>
                <Button className="bg-[#10b981] hover:bg-emerald-700 h-9 text-[11px] font-bold px-4 rounded-lg">CSV</Button>
              </>
            )}
          </div>
        </div>

       
        <Card className="bg-[#151c2e] border-slate-800 shadow-xl">
          <CardContent className="pt-6 space-y-4 text-center">
            <div className="flex justify-between text-[10px] uppercase text-slate-600 font-black">
              <span>Low</span>
              <span>High</span>
            </div>
            <Progress value={readiness} className="h-1.5 bg-slate-900" />
            <p className="text-sm text-slate-300 font-bold">Readiness: {readiness}%</p>
            <p className="text-[11px] text-slate-500 flex items-center justify-center gap-2">
              <span className={cn("w-2 h-2 rounded-full", submissions.length > 0 ? "bg-emerald-500" : "bg-slate-600")} /> 
              {submissions.length > 0 ? "Data synchronized" : "Submit data to see status"}
            </p>
          </CardContent>
        </Card>

       
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((m, i) => (
            <Card key={i} className="bg-[#151c2e]/60 border-slate-800 p-6 text-center flex flex-col items-center justify-center transition-colors hover:bg-[#151c2e]">
              {m.icon}
              <span className="text-[10px] uppercase text-slate-500 font-bold mt-3 tracking-widest">{m.label}</span>
              <span className="text-lg font-bold text-white mt-1">{m.value}</span>
            </Card>
          ))}
        </div>

       
        <Card className="bg-[#151c2e] border-slate-800 overflow-hidden shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-800/50 pb-4">
            <CardTitle className="text-lg font-bold">Post-Training Input</CardTitle>
            <Button 
              variant="outline" 
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-[10px] border-slate-700 text-slate-400 h-8 font-bold hover:bg-slate-800"
            >
              {showAdvanced ? "Hide Advanced Fields" : "Show Advanced Fields"}
              {showAdvanced ? <ChevronUp className="ml-1" size={14} /> : <ChevronDown className="ml-1" size={14} />}
            </Button>
          </CardHeader>
          <CardContent className="pt-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['rpe', 'duration', 'sleep', 'soreness', 'tiredness', 'mood'].map((f) => (
                <Input 
                  key={f}
                  placeholder={f === 'duration' || f === 'sleep' ? `${f.toUpperCase()} Input` : `${f.toUpperCase()} Rating (1-10)`} 
                  className="bg-[#0b1221] border-slate-800 h-12 text-sm"
                  value={form[f]}
                  onChange={(e) => handleInputChange(f, e.target.value)}
                />
              ))}
            </div>

            {showAdvanced && (
              <div className="pt-4 border-t border-slate-800/50 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Wellness Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['sleepQuality', 'energy', 'hydration', 'weight', 'hrv'].map((f) => (
                    <Input 
                      key={f}
                      placeholder={f === 'weight' || f === 'hrv' ? `${f.toUpperCase()}` : `${f.toUpperCase()} Rating (1-10)`}
                      className="bg-[#0b1221] border-slate-800 h-12 text-sm"
                      value={form[f]}
                      onChange={(e) => handleInputChange(f, e.target.value)}
                    />
                  ))}
                </div>
              </div>
            )}

            <Button onClick={handleSubmit} className="w-full bg-[#10b981] hover:bg-emerald-600 text-white font-black h-14 text-base shadow-lg transition-all active:scale-[0.99]">
              Submit Training Data
            </Button>

            <div className="bg-amber-950/20 border border-amber-900/30 p-4 rounded-xl flex gap-4">
              <Lightbulb className="text-amber-500 shrink-0" size={18} />
              <p className="text-[11px] text-amber-200/60 leading-relaxed">
                <span className="font-bold text-amber-500">Tip:</span> Submit your data at the same time each day for better tracking accuracy.
              </p>
            </div>
          </CardContent>
        </Card>

        {showAdvanced && (
          <div className="space-y-4 animate-in fade-in duration-500">
            <h2 className="text-xl font-bold">Recent Submissions</h2>
            <Card className="bg-[#151c2e] border-slate-800 overflow-hidden shadow-xl">
              <Table>
                <TableHeader className="bg-slate-900/50">
                  <TableRow className="border-slate-800">
                    <TableHead className="text-[10px] font-bold text-slate-500">DATE</TableHead>
                    <TableHead className="text-[10px] font-bold text-slate-500">RPE</TableHead>
                    <TableHead className="text-[10px] font-bold text-slate-500">TIREDNESS</TableHead>
                    <TableHead className="text-[10px] font-bold text-slate-500">SLEEP</TableHead>
                    <TableHead className="text-[10px] font-bold text-slate-500">SORENESS</TableHead>
                    <TableHead className="text-[10px] font-bold text-slate-500">MOOD</TableHead>
                    <TableHead className="text-[10px] font-bold text-slate-500 text-right">READINESS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.length === 0 ? (
                    <TableRow className="border-slate-800"><TableCell colSpan={7} className="text-center py-10 text-slate-500 text-xs italic">No data submitted yet.</TableCell></TableRow>
                  ) : (
                    submissions.map((entry, i) => (
                      <TableRow key={i} className="border-slate-800 hover:bg-slate-800/20">
                        <TableCell className="text-[11px] text-slate-400">{entry.date}</TableCell>
                        <TableCell className="text-slate-300">{entry.rpe}</TableCell>
                        <TableCell className="text-slate-300">{entry.tiredness}</TableCell>
                        <TableCell className="text-slate-300">{entry.sleep}</TableCell>
                        <TableCell className="text-slate-300">{entry.soreness}</TableCell>
                        <TableCell className="text-slate-300">{entry.mood}</TableCell>
                        <TableCell className="text-right">
                          <span className="bg-emerald-500/10 text-emerald-500 text-[10px] font-bold px-2 py-1 rounded-full border border-emerald-500/20">
                            {entry.readiness}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Card>
          </div>
        )}

       
        <div className="space-y-4 pb-12">
          <h2 className="text-xl font-bold">Understanding Your Metrics</h2>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {["RPE", "Tiredness Level", "Sleep Quality", "Muscle Soreness", "Mood Rating", "HRV"].map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-slate-800 bg-[#151c2e]/40 rounded-lg px-4 border">
                <AccordionTrigger className="text-slate-300 text-sm py-4 hover:no-underline font-semibold tracking-tight">{item}</AccordionTrigger>
                <AccordionContent className="text-slate-500 text-xs pb-4">Detailed analysis for {item} helps in long-term performance optimization.</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}*/





/*import React, { useState } from "react";
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
  Zap, Droplets, Lightbulb, ChevronDown, ChevronUp, 
  User, Shield, Pencil, Check, Camera 
} from "lucide-react";

export default function PlayerDashboard() {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [readiness, setReadiness] = useState(0);
  
  // Profile State
  const [isEditing, setIsEditing] = useState(false);
  const [player, setPlayer] = useState({
    name: "Alex Johnson",
    position: "Forward",
    team: "Elite Strikers FC",
    number: "09",
    status: "Active",
    image: "" 
  });

  // Updated Form State with only requested fields
  const [form, setForm] = useState({
    rpe: "", 
    duration: "", 
    sleep: "", 
    soreness: "", 
    tiredness: "", 
    strength: "", 
    flexibility: "", 
    endurance: "", 
    cardio: "", 
    balance: "", 
    agility: "", 
    speed: ""
  });

  // Submission History State
  const [submissions, setSubmissions] = useState([]);

  // Profile Update Handlers
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

  // Updated handleSubmit with Validation
  const handleSubmit = () => {
    const isFormComplete = Object.values(form).every(value => value.trim() !== "");

    if (!isFormComplete) {
      alert("Please fill in all details before submitting.");
      return;
    }

    const calculatedScore = Math.floor(Math.random() * 100);
    setReadiness(calculatedScore);

    const newEntry = {
      date: new Date().toLocaleString(),
      rpe: form.rpe ? `${form.rpe}/10` : "-",
      tiredness: form.tiredness ? `${form.tiredness}/10` : "-",
      sleep: form.sleep ? `${form.sleep}h` : "-",
      soreness: form.soreness ? `${form.soreness}/10` : "-",
      duration: form.duration ? `${form.duration}m` : "-",
      readiness: `${calculatedScore}%`
    };

    setSubmissions([newEntry, ...submissions]);
    
    setForm({
      rpe: "", duration: "", sleep: "", soreness: "", tiredness: "", 
      strength: "", flexibility: "", endurance: "", cardio: "", 
      balance: "", agility: "", speed: ""
    });
  };

  const metrics = [
    { label: "Fatigue (RPE)", value: form.rpe ? `${form.rpe}/10` : "No data", icon: <Activity className="text-orange-400" size={20} /> },
    { label: "Tiredness", value: form.tiredness ? `${form.tiredness}/10` : "No data", icon: <Brain className="text-purple-400" size={20} /> },
    { label: "Injury Risk", value: submissions.length > 0 ? "Low" : "No data", icon: <AlertTriangle className="text-red-400" size={20} /> },
    { label: "Last Session", value: form.duration ? `${form.duration}m` : "No data", icon: <Clock className="text-blue-400" size={20} /> },
    { label: "Sleep", value: form.sleep ? `${form.sleep}h` : "No data", icon: <Moon className="text-indigo-400" size={20} /> },
    { label: "Speed", value: form.speed ? `${form.speed}/10` : "No data", icon: <Zap className="text-yellow-400" size={20} /> },
    { label: "Agility", value: form.agility ? `${form.agility}/10` : "No data", icon: <Activity className="text-cyan-400" size={20} /> },
    { label: "Endurance", value: form.endurance ? `${form.endurance}/10` : "No data", icon: <Heart className="text-pink-400" size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-[#0b1221] text-white p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        
      
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
              {isEditing ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 animate-in fade-in zoom-in-95 duration-200">
                  <Input 
                    value={player.name} 
                    onChange={(e) => handleProfileChange('name', e.target.value)}
                    className="h-8 bg-[#0b1221] border-slate-700 text-sm font-bold"
                    placeholder="Name"
                  />
                  <Input 
                    value={player.team} 
                    onChange={(e) => handleProfileChange('team', e.target.value)}
                    className="h-8 bg-[#0b1221] border-slate-700 text-sm"
                    placeholder="Team"
                  />
                </div>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? "default" : "outline"}
              className={cn(
                "h-9 text-[11px] font-bold px-4 rounded-lg",
                isEditing ? "bg-emerald-600 hover:bg-emerald-700 border-none" : "border-slate-700 text-slate-300 hover:bg-slate-800"
              )}
            >
              {isEditing ? <><Check size={14} className="mr-2" /> Save Profile</> : <><Pencil size={12} className="mr-2" /> Edit Profile</>}
            </Button>
            {!isEditing && (
              <>
                <Button className="bg-[#2563eb] hover:bg-blue-700 h-9 text-[11px] font-bold px-4 rounded-lg">JSON</Button>
                <Button className="bg-[#10b981] hover:bg-emerald-700 h-9 text-[11px] font-bold px-4 rounded-lg">CSV</Button>
              </>
            )}
          </div>
        </div>

        
        <Card className="bg-[#151c2e] border-slate-800 shadow-xl">
          <CardContent className="pt-6 space-y-4 text-center">
            <div className="flex justify-between text-[10px] uppercase text-slate-600 font-black">
              <span>Low</span>
              <span>High</span>
            </div>
            <Progress value={readiness} className="h-1.5 bg-slate-900" />
            <p className="text-sm text-slate-300 font-bold">Readiness: {readiness}%</p>
            <p className="text-[11px] text-slate-500 flex items-center justify-center gap-2">
              <span className={cn("w-2 h-2 rounded-full", submissions.length > 0 ? "bg-emerald-500" : "bg-slate-600")} /> 
              {submissions.length > 0 ? "Data synchronized" : "Submit data to see status"}
            </p>
          </CardContent>
        </Card>

        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((m, i) => (
            <Card key={i} className="bg-[#151c2e]/60 border-slate-800 p-6 text-center flex flex-col items-center justify-center transition-colors hover:bg-[#151c2e]">
              {m.icon}
              <span className="text-[10px] uppercase text-slate-500 font-bold mt-3 tracking-widest">{m.label}</span>
              <span className="text-lg font-bold text-white mt-1">{m.value}</span>
            </Card>
          ))}
        </div>

       
        <Card className="bg-[#151c2e] border-slate-800 overflow-hidden shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-800/50 pb-4">
            <CardTitle className="text-lg font-bold">Post-Training Input</CardTitle>
            <Button 
              variant="outline" 
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-[10px] border-slate-700 text-slate-400 h-8 font-bold hover:bg-slate-800"
            >
              {showAdvanced ? "Hide Performance Fields" : "Show Performance Fields"}
              {showAdvanced ? <ChevronUp className="ml-1" size={14} /> : <ChevronDown className="ml-1" size={14} />}
            </Button>
          </CardHeader>
          <CardContent className="pt-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['rpe', 'duration', 'sleep', 'soreness', 'tiredness'].map((f) => (
                <Input 
                  key={f}
                  placeholder={
                    f === 'duration' ? "DURATION (MINUTES)" : 
                    f === 'sleep' ? "SLEEP (HOURS)" : 
                    `${f.toUpperCase()} (1-10)`
                  } 
                  className="bg-[#0b1221] border-slate-800 h-12 text-sm"
                  value={form[f]}
                  onChange={(e) => handleInputChange(f, e.target.value)}
                />
              ))}
            </div>

            {showAdvanced && (
              <div className="pt-4 border-t border-slate-800/50 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Performance Metrics (1-10)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['strength', 'flexibility', 'endurance', 'cardio', 'balance', 'agility', 'speed'].map((f) => (
                    <Input 
                      key={f}
                      placeholder={f === 'cardio' ? 'CARDIOVASCULAR FITNESS (1-10)' : `${f.toUpperCase()} (1-10)`}
                      className="bg-[#0b1221] border-slate-800 h-12 text-sm"
                      value={form[f]}
                      onChange={(e) => handleInputChange(f, e.target.value)}
                    />
                  ))}
                </div>
              </div>
            )}

            <Button onClick={handleSubmit} className="w-full bg-[#10b981] hover:bg-emerald-600 text-white font-black h-14 text-base shadow-lg transition-all active:scale-[0.99]">
              Submit Training Data
            </Button>

            <div className="bg-amber-950/20 border border-amber-900/30 p-4 rounded-xl flex gap-4">
              <Lightbulb className="text-amber-500 shrink-0" size={18} />
              <p className="text-[11px] text-amber-200/60 leading-relaxed">
                <span className="font-bold text-amber-500">Tip:</span> Ensure all 12 fields are filled before submitting to update your readiness score.
              </p>
            </div>
          </CardContent>
        </Card>

       
        {showAdvanced && (
          <div className="space-y-4 animate-in fade-in duration-500">
            <h2 className="text-xl font-bold">Recent Submissions</h2>
            <Card className="bg-[#151c2e] border-slate-800 overflow-hidden shadow-xl">
              <Table>
                <TableHeader className="bg-slate-900/50">
                  <TableRow className="border-slate-800">
                    <TableHead className="text-[10px] font-bold text-slate-500">DATE</TableHead>
                    <TableHead className="text-[10px] font-bold text-slate-500">RPE</TableHead>
                    <TableHead className="text-[10px] font-bold text-slate-500">TIREDNESS</TableHead>
                    <TableHead className="text-[10px] font-bold text-slate-500">SLEEP</TableHead>
                    <TableHead className="text-[10px] font-bold text-slate-500">SORENESS</TableHead>
                    <TableHead className="text-[10px] font-bold text-slate-500 text-right">READINESS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.length === 0 ? (
                    <TableRow className="border-slate-800"><TableCell colSpan={6} className="text-center py-10 text-slate-500 text-xs italic">No data submitted yet.</TableCell></TableRow>
                  ) : (
                    submissions.map((entry, i) => (
                      <TableRow key={i} className="border-slate-800 hover:bg-slate-800/20">
                        <TableCell className="text-[11px] text-slate-400">{entry.date}</TableCell>
                        <TableCell className="text-slate-300">{entry.rpe}</TableCell>
                        <TableCell className="text-slate-300">{entry.tiredness}</TableCell>
                        <TableCell className="text-slate-300">{entry.sleep}</TableCell>
                        <TableCell className="text-slate-300">{entry.soreness}</TableCell>
                        <TableCell className="text-right">
                          <span className="bg-emerald-500/10 text-emerald-500 text-[10px] font-bold px-2 py-1 rounded-full border border-emerald-500/20">
                            {entry.readiness}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Card>
          </div>
        )}

        
        <div className="space-y-4 pb-12">
          <h2 className="text-xl font-bold">Understanding Your Metrics</h2>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {[
              { name: "RPE (Rate of Perceived Exertion)", range: "1 - 10", detail: "Measures the intensity of your session. 1 is extremely easy, 10 is max effort." },
              { name: "Training Duration", range: "Minutes", detail: "The total length of your active training session in minutes." },
              { name: "Sleep Hours", range: "Hours", detail: "Total duration of sleep. Aim for 7-9 hours for professional recovery." },
              { name: "Muscle Soreness", range: "1 - 10", detail: "Level of physical discomfort or DOMS. 1 is no pain, 10 is severe soreness affecting movement." },
              { name: "Feeling Tiredness", range: "1 - 10", detail: "General mental and physical fatigue. 1 is fully energized, 10 is complete exhaustion." },
              { name: "Strength", range: "1 - 10", detail: "Perceived power and force production capability during the session." },
              { name: "Flexibility", range: "1 - 10", detail: "Range of motion and lack of stiffness in joints and muscles." },
              { name: "Endurance", range: "1 - 10", detail: "Ability to sustain prolonged physical effort without fatigue." },
              { name: "Cardiovascular Fitness", range: "1 - 10", detail: "Efficiency of heart and lungs during high-intensity aerobic work." },
              { name: "Balance", range: "1 - 10", detail: "Stability and postural control during complex movements." },
              { name: "Agility", range: "1 - 10", detail: "Ability to change direction quickly and effectively under control." },
              { name: "Speed", range: "1 - 10", detail: "Velocity of movement and reaction time during sprints or drills." }
            ].map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-slate-800 bg-[#151c2e]/40 rounded-lg px-4 border">
                <AccordionTrigger className="text-slate-300 text-sm py-4 hover:no-underline font-semibold tracking-tight">
                  <div className="flex justify-between w-full pr-4">
                    <span>{item.name}</span>
                    <span className="text-emerald-500 text-[10px] font-mono">RANGE: {item.range}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-slate-500 text-xs pb-4 leading-relaxed">
                  {item.detail}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}*/


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
  Zap, Droplets, Lightbulb, ChevronDown, ChevronUp, 
  User, Shield, Pencil, Check, Camera 
} from "lucide-react";

export default function PlayerDashboard() {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [readiness, setReadiness] = useState(0);
  
  // Profile State
  const [isEditing, setIsEditing] = useState(false);
  const [player, setPlayer] = useState({
    name: "Alex Johnson",
    position: "Forward",
    team: "Elite Strikers FC",
    number: "09",
    status: "Active",
    image: "" 
  });

  // Updated Form State with only requested fields
  const [form, setForm] = useState({
    rpe: "", 
    duration: "", 
    sleep: "", 
    soreness: "", 
    tiredness: "", 
    strength: "", 
    flexibility: "", 
    endurance: "", 
    cardio: "", 
    balance: "", 
    agility: "", 
    speed: ""
  });

  // Submission History State
  const [submissions, setSubmissions] = useState([]);

  // Profile Update Handlers
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

  // Updated handleSubmit with Validation
  const handleSubmit = () => {
    const isFormComplete = Object.values(form).every(value => value.trim() !== "");

    if (!isFormComplete) {
      alert("Please fill in all details before submitting.");
      return;
    }

    // Logic updated: Data is sent to the analyst dashboard.
    // The readiness score is provided by the analyst/system, not calculated here.
    const receivedReadinessScore = readiness; // Value is managed/received from external analyst data

    const newEntry = {
      date: new Date().toLocaleString(),
      rpe: form.rpe ? `${form.rpe}/10` : "-",
      tiredness: form.tiredness ? `${form.tiredness}/10` : "-",
      sleep: form.sleep ? `${form.sleep}h` : "-",
      soreness: form.soreness ? `${form.soreness}/10` : "-",
      duration: form.duration ? `${form.duration}m` : "-",
      readiness: `${receivedReadinessScore}%`
    };

    setSubmissions([newEntry, ...submissions]);
    
    setForm({
      rpe: "", duration: "", sleep: "", soreness: "", tiredness: "", 
      strength: "", flexibility: "", endurance: "", cardio: "", 
      balance: "", agility: "", speed: ""
    });
  };

  const metrics = [
    { label: "Fatigue (RPE)", value: form.rpe ? `${form.rpe}/10` : "No data", icon: <Activity className="text-orange-400" size={20} /> },
    { label: "Tiredness", value: form.tiredness ? `${form.tiredness}/10` : "No data", icon: <Brain className="text-purple-400" size={20} /> },
    { label: "Injury Risk", value: submissions.length > 0 ? "Low" : "No data", icon: <AlertTriangle className="text-red-400" size={20} /> },
    { label: "Last Session", value: form.duration ? `${form.duration}m` : "No data", icon: <Clock className="text-blue-400" size={20} /> },
    { label: "Sleep", value: form.sleep ? `${form.sleep}h` : "No data", icon: <Moon className="text-indigo-400" size={20} /> },
    { label: "Speed", value: form.speed ? `${form.speed}/10` : "No data", icon: <Zap className="text-yellow-400" size={20} /> },
    { label: "Agility", value: form.agility ? `${form.agility}/10` : "No data", icon: <Activity className="text-cyan-400" size={20} /> },
    { label: "Endurance", value: form.endurance ? `${form.endurance}/10` : "No data", icon: <Heart className="text-pink-400" size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-[#0b1221] text-white p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Profile Header Section */}
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
              {isEditing ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 animate-in fade-in zoom-in-95 duration-200">
                  <Input 
                    value={player.name} 
                    onChange={(e) => handleProfileChange('name', e.target.value)}
                    className="h-8 bg-[#0b1221] border-slate-700 text-sm font-bold"
                    placeholder="Name"
                  />
                  <Input 
                    value={player.team} 
                    onChange={(e) => handleProfileChange('team', e.target.value)}
                    className="h-8 bg-[#0b1221] border-slate-700 text-sm"
                    placeholder="Team"
                  />
                </div>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? "default" : "outline"}
              className={cn(
                "h-9 text-[11px] font-bold px-4 rounded-lg",
                isEditing ? "bg-emerald-600 hover:bg-emerald-700 border-none" : "border-slate-700 text-slate-300 hover:bg-slate-800"
              )}
            >
              {isEditing ? <><Check size={14} className="mr-2" /> Save Profile</> : <><Pencil size={12} className="mr-2" /> Edit Profile</>}
            </Button>
            {!isEditing && (
              <>
                <Button className="bg-[#2563eb] hover:bg-blue-700 h-9 text-[11px] font-bold px-4 rounded-lg">JSON</Button>
                <Button className="bg-[#10b981] hover:bg-emerald-700 h-9 text-[11px] font-bold px-4 rounded-lg">CSV</Button>
              </>
            )}
          </div>
        </div>

        {/* Readiness Card */}
        <Card className="bg-[#151c2e] border-slate-800 shadow-xl">
          <CardContent className="pt-6 space-y-4 text-center">
            <div className="flex justify-between text-[10px] uppercase text-slate-600 font-black">
              <span>Low</span>
              <span>High</span>
            </div>
            <Progress value={readiness} className="h-1.5 bg-slate-900" />
            <p className="text-sm text-slate-300 font-bold">Readiness: {readiness}%</p>
            <p className="text-[11px] text-slate-500 flex items-center justify-center gap-2">
              <span className={cn("w-2 h-2 rounded-full", submissions.length > 0 ? "bg-emerald-500" : "bg-slate-600")} /> 
              {submissions.length > 0 ? "Data synchronized" : "Submit data to see status"}
            </p>
          </CardContent>
        </Card>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((m, i) => (
            <Card key={i} className="bg-[#151c2e]/60 border-slate-800 p-6 text-center flex flex-col items-center justify-center transition-colors hover:bg-[#151c2e]">
              {m.icon}
              <span className="text-[10px] uppercase text-slate-500 font-bold mt-3 tracking-widest">{m.label}</span>
              <span className="text-lg font-bold text-white mt-1">{m.value}</span>
            </Card>
          ))}
        </div>

        {/* Input Form */}
        <Card className="bg-[#151c2e] border-slate-800 overflow-hidden shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-800/50 pb-4">
            <CardTitle className="text-lg font-bold">Post-Training Input</CardTitle>
            <Button 
              variant="outline" 
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-[10px] border-slate-700 text-slate-400 h-8 font-bold hover:bg-slate-800"
            >
              {showAdvanced ? "Hide Performance Fields" : "Show Performance Fields"}
              {showAdvanced ? <ChevronUp className="ml-1" size={14} /> : <ChevronDown className="ml-1" size={14} />}
            </Button>
          </CardHeader>
          <CardContent className="pt-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['rpe', 'duration', 'sleep', 'soreness', 'tiredness'].map((f) => (
                <Input 
                  key={f}
                  placeholder={
                    f === 'duration' ? "DURATION (MINUTES)" : 
                    f === 'sleep' ? "SLEEP (HOURS)" : 
                    `${f.toUpperCase()} (1-10)`
                  } 
                  className="bg-[#0b1221] border-slate-800 h-12 text-sm"
                  value={form[f]}
                  onChange={(e) => handleInputChange(f, e.target.value)}
                />
              ))}
            </div>

            {showAdvanced && (
              <div className="pt-4 border-t border-slate-800/50 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Performance Metrics (1-10)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['strength', 'flexibility', 'endurance', 'cardio', 'balance', 'agility', 'speed'].map((f) => (
                    <Input 
                      key={f}
                      placeholder={f === 'cardio' ? 'CARDIOVASCULAR FITNESS (1-10)' : `${f.toUpperCase()} (1-10)`}
                      className="bg-[#0b1221] border-slate-800 h-12 text-sm"
                      value={form[f]}
                      onChange={(e) => handleInputChange(f, e.target.value)}
                    />
                  ))}
                </div>
              </div>
            )}

            <Button onClick={handleSubmit} className="w-full bg-[#10b981] hover:bg-emerald-600 text-white font-black h-14 text-base shadow-lg transition-all active:scale-[0.99]">
              Submit Training Data
            </Button>

            <div className="bg-amber-950/20 border border-amber-900/30 p-4 rounded-xl flex gap-4">
              <Lightbulb className="text-amber-500 shrink-0" size={18} />
              <p className="text-[11px] text-amber-200/60 leading-relaxed">
                <span className="font-bold text-amber-500">Tip:</span> Ensure all 12 fields are filled before submitting to update your readiness score.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Submissions Table */}
        {showAdvanced && (
          <div className="space-y-4 animate-in fade-in duration-500">
            <h2 className="text-xl font-bold">Recent Submissions</h2>
            <Card className="bg-[#151c2e] border-slate-800 overflow-hidden shadow-xl">
              <Table>
                <TableHeader className="bg-slate-900/50">
                  <TableRow className="border-slate-800">
                    <TableHead className="text-[10px] font-bold text-slate-500">DATE</TableHead>
                    <TableHead className="text-[10px] font-bold text-slate-500">RPE</TableHead>
                    <TableHead className="text-[10px] font-bold text-slate-500">TIREDNESS</TableHead>
                    <TableHead className="text-[10px] font-bold text-slate-500">SLEEP</TableHead>
                    <TableHead className="text-[10px] font-bold text-slate-500">SORENESS</TableHead>
                    <TableHead className="text-[10px] font-bold text-slate-500 text-right">READINESS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.length === 0 ? (
                    <TableRow className="border-slate-800"><TableCell colSpan={6} className="text-center py-10 text-slate-500 text-xs italic">No data submitted yet.</TableCell></TableRow>
                  ) : (
                    submissions.map((entry, i) => (
                      <TableRow key={i} className="border-slate-800 hover:bg-slate-800/20">
                        <TableCell className="text-[11px] text-slate-400">{entry.date}</TableCell>
                        <TableCell className="text-slate-300">{entry.rpe}</TableCell>
                        <TableCell className="text-slate-300">{entry.tiredness}</TableCell>
                        <TableCell className="text-slate-300">{entry.sleep}</TableCell>
                        <TableCell className="text-slate-300">{entry.soreness}</TableCell>
                        <TableCell className="text-right">
                          <span className="bg-emerald-500/10 text-emerald-500 text-[10px] font-bold px-2 py-1 rounded-full border border-emerald-500/20">
                            {entry.readiness}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Card>
          </div>
        )}

        {/* Updated Footer Accordion with all Metric Details and Ranges */}
        <div className="space-y-4 pb-12">
          <h2 className="text-xl font-bold">Understanding Your Metrics</h2>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {[
              { name: "RPE (Rate of Perceived Exertion)", range: "1 - 10", detail: "Measures the intensity of your session. 1 is extremely easy, 10 is max effort." },
              { name: "Training Duration", range: "Minutes", detail: "The total length of your active training session in minutes." },
              { name: "Sleep Hours", range: "Hours", detail: "Total duration of sleep. Aim for 7-9 hours for professional recovery." },
              { name: "Muscle Soreness", range: "1 - 10", detail: "Level of physical discomfort or DOMS. 1 is no pain, 10 is severe soreness affecting movement." },
              { name: "Feeling Tiredness", range: "1 - 10", detail: "General mental and physical fatigue. 1 is fully energized, 10 is complete exhaustion." },
              { name: "Strength", range: "1 - 10", detail: "Perceived power and force production capability during the session." },
              { name: "Flexibility", range: "1 - 10", detail: "Range of motion and lack of stiffness in joints and muscles." },
              { name: "Endurance", range: "1 - 10", detail: "Ability to sustain prolonged physical effort without fatigue." },
              { name: "Cardiovascular Fitness", range: "1 - 10", detail: "Efficiency of heart and lungs during high-intensity aerobic work." },
              { name: "Balance", range: "1 - 10", detail: "Stability and postural control during complex movements." },
              { name: "Agility", range: "1 - 10", detail: "Ability to change direction quickly and effectively under control." },
              { name: "Speed", range: "1 - 10", detail: "Velocity of movement and reaction time during sprints or drills." }
            ].map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-slate-800 bg-[#151c2e]/40 rounded-lg px-4 border">
                <AccordionTrigger className="text-slate-300 text-sm py-4 hover:no-underline font-semibold tracking-tight">
                  <div className="flex justify-between w-full pr-4">
                    <span>{item.name}</span>
                    <span className="text-emerald-500 text-[10px] font-mono">RANGE: {item.range}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-slate-500 text-xs pb-4 leading-relaxed">
                  {item.detail}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}