import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft, Target, Activity, Users, FileText, ClipboardCopy, CheckCircle2, GraduationCap } from 'lucide-react';

const copyToClipboard = (text) => {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Copy failed', err);
  }
  document.body.removeChild(textArea);
};

const formTextToCopy = `
SURVEY TITLE: The Seniority Shift: A Quantitative Analysis of Developer Experience and AI-First Coding Adaptation
DESCRIPTION: We are conducting an empirical study to analyze how a software engineer's years of industry experience correlate with their adoption of "AI-First" development workflows. This survey requires exactly 3 minutes to complete. All responses are strictly anonymous and will be utilized exclusively for academic statistical analysis.

*** SECTION 1: DEMOGRAPHIC BASELINE ***
1. How many years of professional software development experience do you have? (Multiple Choice)
[ ] Less than 1 year (Student / Intern)
[ ] 1 to 3 years (Junior)
[ ] 4 to 6 years (Mid-Level)
[ ] 7+ years (Senior / Lead / Architect)

2. What is your current primary role? (Multiple Choice)
[ ] Frontend Developer
[ ] Backend Developer
[ ] Full Stack Developer
[ ] Mobile Developer
[ ] DevOps / Infrastructure

3. What is your primary method of interacting with AI for coding? (Multiple Choice)
[ ] Integrated IDE tools (Cursor, GitHub Copilot)
[ ] Web-based chat (ChatGPT, Claude web UI)
[ ] Custom API integrations
[ ] I do not use AI for coding

*** SECTION 2: MINDSET AND ADAPTATION (Likert 1-5) ***
Rate from 1 (Strongly Disagree) to 5 (Strongly Agree)

4. Instinct: "When starting a new feature, my first instinct is to write a prompt rather than write the skeleton code from scratch." (Linear Scale 1-5)

5. Architecture: "I rely on AI tools to help architect system design and plan logic, not just for syntax auto-complete." (Linear Scale 1-5)

6. Dependency: "I feel my productivity drops significantly if I have to code in an environment where AI assistants are completely disabled." (Linear Scale 1-5)

*** SECTION 3: THE VERIFICATION TAX (Likert 1-5) ***
Rate from 1 (Strongly Disagree) to 5 (Strongly Agree)

7. Skepticism: "My prior coding experience makes it easy for me to spot when the AI generates flawed architecture or logic." (Linear Scale 1-5)

8. Trust vs. Review: "I spend less time reviewing AI-generated code than I would reviewing a human colleague's pull request." (Linear Scale 1-5)

9. Unlearning: "Learning to use AI effectively required me to actively unlearn traditional line-by-line coding habits." (Linear Scale 1-5)

10. Deployment Risk: "I have accidentally deployed or committed code containing logic errors that were originally hallucinated by an AI tool." (Linear Scale 1-5)

*** SECTION 4: QUALITATIVE INSIGHT (Optional) ***
11. Briefly describe the most dangerous or time-consuming AI hallucination you have encountered in your workflow. (Paragraph)
`;

const slides = [
  {
    id: 'cover',
    isCover: true,
    title: 'The Seniority Shift',
    subtitle: 'A Quantitative Analysis of Developer Experience',
    content: (
      <div className="flex flex-col items-center justify-center space-y-6 text-center mt-8">
        <div className="px-6 py-2 bg-stone-900 text-stone-100 rounded-full text-xs font-bold tracking-widest uppercase shadow-md">
          Research Publication Proposal • 2026
        </div>
        <p className="text-xl text-stone-700 max-w-2xl mx-auto leading-relaxed font-medium">
          An empirical study evaluating how industry tenure influences the adoption, trust, and verification of AI coding assistants in Sri Lanka.
        </p>
      </div>
    )
  },
  {
    id: 'concept',
    title: 'Defining "AI-First"',
    subtitle: 'The Behavioral Shift',
    icon: <Target className="w-8 h-8 text-emerald-600" />,
    content: (
      <div className="space-y-6 text-stone-700">
        <p className="text-xl font-medium text-stone-900 leading-relaxed">
          Before we analyze the data, we must define the exact behavior we are measuring.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="p-8 bg-white rounded-2xl border border-stone-200 shadow-sm transition-all hover:shadow-md">
            <h4 className="font-bold text-stone-400 uppercase tracking-widest text-xs mb-3">Traditional Paradigm</h4>
            <p className="text-stone-800 leading-relaxed">Write the code line by line. If blocked, search for the error, parse documentation, and adapt the solution manually.</p>
          </div>
          <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200 shadow-sm relative overflow-hidden transition-all hover:shadow-md">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-100/50 rounded-bl-full -z-10"></div>
            <h4 className="font-bold text-emerald-700 uppercase tracking-widest text-xs mb-3">AI-First Paradigm</h4>
            <p className="text-stone-800 leading-relaxed">Describe the architecture. Let the AI generate the foundation. The developer's primary cognitive load shifts from <em>generation</em> to <em>verification</em>.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'conflict',
    title: 'The Core Hypothesis',
    subtitle: 'Who Adapts Faster?',
    icon: <Users className="w-8 h-8 text-emerald-600" />,
    content: (
      <div className="space-y-6">
        <p className="text-lg text-stone-700 leading-relaxed">
          This research bridges a gap in current literature. There are two competing industry theories regarding adaptation velocity.
        </p>
        <div className="space-y-4">
          <div className="flex items-start space-x-5 p-6 bg-white rounded-xl border border-stone-200 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold flex-shrink-0 text-lg">A</div>
            <div>
              <h4 className="font-bold text-stone-900 text-lg">The Junior Advantage (The Blank Slate)</h4>
              <p className="text-stone-600 mt-2 leading-relaxed">Junior developers adapt faster because they possess no legacy habits to break. They natively accept AI-driven logic generation.</p>
            </div>
          </div>
          <div className="flex items-start space-x-5 p-6 bg-white rounded-xl border border-stone-200 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold flex-shrink-0 text-lg">B</div>
            <div>
              <h4 className="font-bold text-stone-900 text-lg">The Senior Advantage (The Architect)</h4>
              <p className="text-stone-600 mt-2 leading-relaxed">Senior developers adapt faster because they understand underlying system architecture and can instantly parse AI hallucinations.</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'variables',
    title: 'Statistical Architecture',
    subtitle: 'Methodology',
    icon: <Activity className="w-8 h-8 text-emerald-600" />,
    content: (
      <div className="space-y-6">
        <p className="text-lg text-stone-700 leading-relaxed">
          To ensure publication viability, we map two exact variables against each other to facilitate an ANOVA or Pearson correlation test.
        </p>
        <div className="grid grid-cols-2 gap-6">
          <div className="p-8 bg-stone-900 rounded-2xl text-white shadow-xl">
            <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">Independent Variable (X-Axis)</h4>
            <p className="text-2xl font-bold mb-3">Years of Experience</p>
            <p className="text-sm text-stone-400 leading-relaxed">Categorized into four specific buckets (Intern, Junior, Mid, Senior) to segment the baseline data cleanly.</p>
          </div>
          <div className="p-8 bg-white border border-stone-200 rounded-2xl shadow-xl">
            <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-3">Dependent Variable (Y-Axis)</h4>
            <p className="text-2xl font-bold text-stone-900 mb-3">Adaptation Score</p>
            <p className="text-sm text-stone-600 leading-relaxed">Calculated by averaging numeric responses to a validated 1-to-5 Likert scale instrument assessing workflow instincts.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'form_template',
    title: 'The Survey Instrument',
    subtitle: '11-Point Psychometric Design',
    icon: <CheckCircle2 className="w-8 h-8 text-emerald-600" />,
    content: null 
  }
];

const FormPreview = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    copyToClipboard(formTextToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-[60vh] min-h-[500px]">
      <div className="flex justify-between items-center mb-6 px-2">
        <p className="text-sm text-stone-600 font-bold flex items-center gap-2 tracking-wide uppercase">
          <GraduationCap className="w-5 h-5 text-emerald-700" />
          Data Collection Ready
        </p>
        <button 
          onClick={handleCopy}
          className="flex items-center space-x-2 bg-stone-900 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg active:scale-95"
        >
          {copied ? <CheckCircle2 className="w-4 h-4" /> : <ClipboardCopy className="w-4 h-4" />}
          <span>{copied ? 'Copied to Clipboard' : 'Copy Form Text'}</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-4 space-y-8 custom-scrollbar pb-12">
        {/* Form Header */}
        <div className="bg-white p-10 rounded-2xl border border-stone-200 border-t-8 border-t-emerald-700 shadow-md">
          <h3 className="text-3xl font-extrabold text-stone-900 mb-4 tracking-tight leading-tight">The Seniority Shift: A Quantitative Analysis of Developer Experience and AI-First Coding Adaptation</h3>
          <p className="text-stone-600 text-base leading-relaxed mb-6">
            We are conducting an empirical study to analyze how a software engineer's years of industry experience correlate with their adoption of "AI-First" development workflows. 
          </p>
          <div className="inline-block bg-stone-100 text-stone-700 text-xs font-bold px-4 py-1.5 rounded-full border border-stone-200 uppercase tracking-widest">
            Estimated time: 3 Minutes
          </div>
        </div>

        {/* Section 1 */}
        <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-md relative pt-12">
          <div className="absolute top-0 left-0 bg-stone-900 text-white px-5 py-2 text-xs font-bold uppercase rounded-br-xl rounded-tl-2xl tracking-widest shadow-sm">
            Section 1: Demographic Baseline
          </div>
          
          <div className="mb-8">
            <label className="block text-stone-900 font-bold mb-4 text-lg">1. How many years of professional experience do you have?</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['< 1 year (Student/Intern)', '1 to 3 years (Junior)', '4 to 6 years (Mid-Level)', '7+ years (Senior / Lead)'].map(role => (
                <div key={role} className="flex items-center space-x-4 bg-stone-50 p-4 rounded-xl border border-stone-200 hover:border-emerald-500 hover:bg-emerald-50/30 transition-colors cursor-pointer group">
                  <div className="w-5 h-5 rounded-full border-2 border-stone-300 group-hover:border-emerald-500 flex-shrink-0 bg-white"></div>
                  <span className="text-stone-800 font-medium">{role}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-stone-900 font-bold mb-4 text-lg">2. What is your primary method of interacting with AI for coding?</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Integrated IDE tools (Cursor, Copilot)', 'Web-based chat (ChatGPT, Claude)', 'Custom API integrations', 'I do not use AI for coding'].map(method => (
                <div key={method} className="flex items-center space-x-4 bg-stone-50 p-4 rounded-xl border border-stone-200 hover:border-emerald-500 hover:bg-emerald-50/30 transition-colors cursor-pointer group">
                  <div className="w-5 h-5 rounded-full border-2 border-stone-300 group-hover:border-emerald-500 flex-shrink-0 bg-white"></div>
                  <span className="text-stone-800 font-medium">{method}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-md relative pt-12">
          <div className="absolute top-0 left-0 bg-emerald-700 text-white px-5 py-2 text-xs font-bold uppercase rounded-br-xl rounded-tl-2xl tracking-widest shadow-sm">
            Section 2: Mindset & Adaptation
          </div>
          <p className="text-xs text-stone-500 mb-8 uppercase tracking-widest font-bold">Likert Scale (1 = Strongly Disagree, 5 = Strongly Agree)</p>
          
          <div className="mb-10">
            <label className="block text-stone-900 font-bold mb-6 text-lg">"When starting a new feature, my first instinct is to write a prompt rather than write the skeleton code from scratch."</label>
            <div className="flex justify-between items-center bg-stone-50 p-6 md:p-8 rounded-2xl border border-stone-200 shadow-inner">
              <span className="text-xs font-bold text-stone-500 uppercase w-16 md:w-24 text-center leading-relaxed">Strongly Disagree</span>
              <div className="flex space-x-4 md:space-x-8">
                {[1,2,3,4,5].map(num => (
                  <div key={num} className="flex flex-col items-center space-y-3 cursor-pointer group">
                    <div className="w-7 h-7 rounded-full border-2 border-stone-300 group-hover:border-emerald-500 group-hover:bg-emerald-50 transition-colors bg-white shadow-sm"></div>
                    <span className="text-sm font-bold text-stone-400 group-hover:text-emerald-700">{num}</span>
                  </div>
                ))}
              </div>
              <span className="text-xs font-bold text-stone-500 uppercase w-16 md:w-24 text-center leading-relaxed">Strongly Agree</span>
            </div>
          </div>

          <div>
            <label className="block text-stone-900 font-bold mb-6 text-lg">"I feel my productivity drops significantly if I have to code in an environment where AI assistants are completely disabled."</label>
            <div className="flex justify-between items-center bg-stone-50 p-6 md:p-8 rounded-2xl border border-stone-200 shadow-inner">
              <span className="text-xs font-bold text-stone-500 uppercase w-16 md:w-24 text-center leading-relaxed">Strongly Disagree</span>
              <div className="flex space-x-4 md:space-x-8">
                {[1,2,3,4,5].map(num => (
                  <div key={num} className="flex flex-col items-center space-y-3 cursor-pointer group">
                    <div className="w-7 h-7 rounded-full border-2 border-stone-300 group-hover:border-emerald-500 group-hover:bg-emerald-50 transition-colors bg-white shadow-sm"></div>
                    <span className="text-sm font-bold text-stone-400 group-hover:text-emerald-700">{num}</span>
                  </div>
                ))}
              </div>
              <span className="text-xs font-bold text-stone-500 uppercase w-16 md:w-24 text-center leading-relaxed">Strongly Agree</span>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-md relative pt-12">
          <div className="absolute top-0 left-0 bg-blue-800 text-white px-5 py-2 text-xs font-bold uppercase rounded-br-xl rounded-tl-2xl tracking-widest shadow-sm">
            Section 3: The Verification Tax
          </div>
          <p className="text-xs text-stone-500 mb-8 uppercase tracking-widest font-bold">Likert Scale (1 = Strongly Disagree, 5 = Strongly Agree)</p>
          
          <div className="mb-10">
            <label className="block text-stone-900 font-bold mb-6 text-lg">"My prior coding experience makes it easy for me to spot when the AI generates flawed architecture or logic."</label>
            <div className="flex justify-between items-center bg-stone-50 p-6 md:p-8 rounded-2xl border border-stone-200 shadow-inner">
              <span className="text-xs font-bold text-stone-500 uppercase w-16 md:w-24 text-center leading-relaxed">Strongly Disagree</span>
              <div className="flex space-x-4 md:space-x-8">
                {[1,2,3,4,5].map(num => (
                  <div key={num} className="flex flex-col items-center space-y-3 cursor-pointer group">
                    <div className="w-7 h-7 rounded-full border-2 border-stone-300 group-hover:border-emerald-500 group-hover:bg-emerald-50 transition-colors bg-white shadow-sm"></div>
                    <span className="text-sm font-bold text-stone-400 group-hover:text-emerald-700">{num}</span>
                  </div>
                ))}
              </div>
              <span className="text-xs font-bold text-stone-500 uppercase w-16 md:w-24 text-center leading-relaxed">Strongly Agree</span>
            </div>
          </div>

          <div>
            <label className="block text-stone-900 font-bold mb-6 text-lg">"I spend less time reviewing AI-generated code than I would reviewing a human colleague's pull request."</label>
            <div className="flex justify-between items-center bg-stone-50 p-6 md:p-8 rounded-2xl border border-stone-200 shadow-inner">
              <span className="text-xs font-bold text-stone-500 uppercase w-16 md:w-24 text-center leading-relaxed">Strongly Disagree</span>
              <div className="flex space-x-4 md:space-x-8">
                {[1,2,3,4,5].map(num => (
                  <div key={num} className="flex flex-col items-center space-y-3 cursor-pointer group">
                    <div className="w-7 h-7 rounded-full border-2 border-stone-300 group-hover:border-emerald-500 group-hover:bg-emerald-50 transition-colors bg-white shadow-sm"></div>
                    <span className="text-sm font-bold text-stone-400 group-hover:text-emerald-700">{num}</span>
                  </div>
                ))}
              </div>
              <span className="text-xs font-bold text-stone-500 uppercase w-16 md:w-24 text-center leading-relaxed">Strongly Agree</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const canvasRef = useRef(null);
  const threeState = useRef({ scene: null, camera: null, renderer: null, origami: null, targetRotation: { x: 0, y: 0 } });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setCurrentSlide(s => Math.min(s + 1, slides.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide(s => Math.max(s - 1, 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (threeState.current.origami) {
      threeState.current.targetRotation.y = currentSlide * (Math.PI / 2);
      threeState.current.targetRotation.x = currentSlide === 0 ? 0 : ((currentSlide % 2 === 0) ? 0.2 : -0.2);
    }
  }, [currentSlide]);

  useEffect(() => {
    let script = document.querySelector('#three-js-script');
    
    const initThree = () => {
      if (!window.THREE || !canvasRef.current) return;
      
      const THREE = window.THREE;
      const width = window.innerWidth;
      const height = window.innerHeight;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#f5f5f4'); 
      scene.fog = new THREE.Fog('#f5f5f4', 15, 60);

      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.z = 18;
      camera.position.x = window.innerWidth > 768 ? 6 : 0;

      const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xfffdfa, 1.6); 
      keyLight.position.set(10, 15, 10);
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0xe8f5e9, 0.9);
      fillLight.position.set(-10, 0, 10);
      scene.add(fillLight);

      const rimLight = new THREE.DirectionalLight(0xffffff, 1.4);
      rimLight.position.set(0, 10, -15);
      scene.add(rimLight);

      const radius = 4;
      const baseGeo = new THREE.IcosahedronGeometry(radius, 2).toNonIndexed(); 
      const posAttribute = baseGeo.getAttribute('position');
      const origPositions = new Float32Array(posAttribute.array);
      const currentPositions = new Float32Array(posAttribute.array);

      const generateTargetShape = (orig, attractors) => {
        const target = new Float32Array(orig.length);
        const center = new THREE.Vector3();
        
        for (let i = 0; i < orig.length; i += 9) {
          center.set(
            (orig[i] + orig[i+3] + orig[i+6]) / 3,
            (orig[i+1] + orig[i+4] + orig[i+7]) / 3,
            (orig[i+2] + orig[i+5] + orig[i+8]) / 3
          );

          let closest = attractors[0];
          let minDist = center.distanceTo(closest);
          for (let j = 1; j < attractors.length; j++) {
            const d = center.distanceTo(attractors[j]);
            if (d < minDist) { minDist = d; closest = attractors[j]; }
          }

          const offset = center.clone().normalize().multiplyScalar(0.6);
          
          for (let j = 0; j < 9; j += 3) {
            const localX = (orig[i+j] - center.x) * 0.7;
            const localY = (orig[i+j+1] - center.y) * 0.7;
            const localZ = (orig[i+j+2] - center.z) * 0.7;
            
            target[i+j] = closest.x + localX + offset.x;
            target[i+j+1] = closest.y + localY + offset.y;
            target[i+j+2] = closest.z + localZ + offset.z;
          }
        }
        return target;
      };

      const generateCrumpled = (orig) => {
        const target = new Float32Array(orig.length);
        for (let i = 0; i < orig.length; i += 9) {
          const cx = (orig[i] + orig[i+3] + orig[i+6]) / 3;
          const cy = (orig[i+1] + orig[i+4] + orig[i+7]) / 3;
          const cz = (orig[i+2] + orig[i+5] + orig[i+8]) / 3;
          const noise = 1 + (Math.sin(cx * 1.5) + Math.cos(cy * 1.5) + Math.sin(cz * 1.5)) * 0.15;
          for (let j = 0; j < 9; j += 3) {
            target[i+j] = orig[i+j] * noise;
            target[i+j+1] = orig[i+j+1] * noise;
            target[i+j+2] = orig[i+j+2] * noise;
          }
        }
        return target;
      };

      const shapesData = [
        generateCrumpled(origPositions),
        generateTargetShape(origPositions, [ 
          new THREE.Vector3(0, 0, 6),     
          new THREE.Vector3(0, 2, -4),    
          new THREE.Vector3(0, -1, -4),   
          new THREE.Vector3(-4.5, 0.5, -2), 
          new THREE.Vector3(4.5, 0.5, -2)   
        ]),
        generateTargetShape(origPositions, [ 
          new THREE.Vector3(0, 1, 5),     
          new THREE.Vector3(0, 1, -5),    
          new THREE.Vector3(0, 4, 0),     
          new THREE.Vector3(-3, -1, 0),   
          new THREE.Vector3(3, -1, 0),    
          new THREE.Vector3(0, -2.5, 0)   
        ]),
        generateTargetShape(origPositions, [ 
          new THREE.Vector3(0, 5, 4),     
          new THREE.Vector3(0, 3, -5),    
          new THREE.Vector3(-6, 2, 0),    
          new THREE.Vector3(6, 2, 0),     
          new THREE.Vector3(0, 0, 0),     
          new THREE.Vector3(0, -3, 0)     
        ])
      ];

      const material = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness: 0.8,
        metalness: 0.05,
        clearcoat: 0.1,
        clearcoatRoughness: 0.5,
        flatShading: true,
        side: THREE.DoubleSide
      });

      const origami = new THREE.Mesh(baseGeo, material);
      scene.add(origami);

      threeState.current = { scene, camera, renderer, origami, targetRotation: { x: 0, y: 0 } };

      let animationFrameId;
      const clock = new THREE.Clock();
      let currentShapeIndex = 0;
      let lastMorphTime = 0;

      const animate = () => {
        const time = clock.getElapsedTime();
        const state = threeState.current;
        
        if (state.origami) {
          if (time - lastMorphTime > 4) {
            currentShapeIndex = (currentShapeIndex + 1) % shapesData.length;
            lastMorphTime = time;
          }

          const targetShape = shapesData[currentShapeIndex];

          let needsNormalUpdate = false;
          for (let i = 0; i < currentPositions.length; i++) {
            const diff = targetShape[i] - currentPositions[i];
            if (Math.abs(diff) > 0.001) {
              currentPositions[i] += diff * 0.08;
              needsNormalUpdate = true;
            }
          }

          if (needsNormalUpdate) {
            posAttribute.needsUpdate = true;
            baseGeo.computeVertexNormals(); 
          }

          const targetY = currentSlide === 0 ? 1 : 0;
          state.origami.position.y += (targetY + Math.sin(time * 0.5) * 0.5 - state.origami.position.y) * 0.05;
          
          state.origami.rotation.y += (state.targetRotation.y + time * 0.1 - state.origami.rotation.y) * 0.05;
          state.origami.rotation.x += (state.targetRotation.x - state.origami.rotation.x) * 0.05;
        }

        state.renderer.render(state.scene, state.camera);
        animationFrameId = requestAnimationFrame(animate);
      };

      animate();

      const handleResize = () => {
        const state = threeState.current;
        if (!state || !state.camera || !state.renderer) return;
        state.camera.aspect = window.innerWidth / window.innerHeight;
        state.camera.position.x = window.innerWidth > 768 ? 6 : 0;
        state.camera.updateProjectionMatrix();
        state.renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
        const state = threeState.current;
        if (state && state.renderer) state.renderer.dispose();
      };
    };

    if (!script) {
      script = document.createElement('script');
      script.id = 'three-js-script';
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      script.onload = initThree;
      document.body.appendChild(script);
    } else if (window.THREE) {
      initThree();
    }
  }, [currentSlide]);

  const slide = slides[currentSlide];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-stone-100 font-sans selection:bg-emerald-200">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #d6d3d1; border-radius: 10px; }
      `}</style>
      
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 md:p-12 lg:p-16">
        
        <header className="flex justify-between items-center w-full max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-800 rounded-sm flex items-center justify-center transform rotate-45 shadow-sm">
              <div className="w-3 h-3 bg-stone-100 transform -rotate-45" />
            </div>
            <span className="text-stone-800 font-bold tracking-widest uppercase text-sm">Undergrad Research</span>
          </div>
          
          <div className="flex space-x-1">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-10 h-1.5 md:w-12 md:h-2 rounded-full transition-all duration-300 ${
                  idx === currentSlide ? 'bg-emerald-600' : 'bg-stone-300 hover:bg-stone-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </header>

        <main className={`flex-1 flex w-full max-w-7xl mx-auto py-8 ${slide.isCover ? 'items-end pb-24 justify-center' : 'items-center justify-start'}`}>
          <div 
            key={currentSlide} 
            className={`w-full ${slide.isCover ? 'max-w-4xl text-center bg-white/60 border-white/40' : (slide.id === 'form_template' ? 'max-w-4xl' : 'max-w-2xl')} bg-white/90 backdrop-blur-2xl p-8 md:p-14 rounded-[2rem] shadow-2xl border border-white/80 animate-in fade-in slide-in-from-bottom-8 duration-500 ease-out transition-all`}
          >
            {!slide.isCover && (
              <div className="flex items-center space-x-4 mb-4 md:mb-8">
                {slide.icon}
                <h2 className="text-emerald-800 font-bold tracking-widest uppercase text-xs md:text-sm">{slide.subtitle}</h2>
              </div>
            )}
            
            <h1 className={`${slide.isCover ? 'text-5xl md:text-7xl mb-6 text-stone-900 drop-shadow-sm' : 'text-3xl md:text-4xl lg:text-5xl mb-8 text-stone-900'} font-extrabold leading-tight tracking-tight`}>
              {slide.title}
            </h1>
            
            {slide.id === 'form_template' ? (
              <FormPreview />
            ) : (
              <div className="text-stone-800">
                {slide.content}
              </div>
            )}
          </div>
        </main>

        <footer className="flex justify-between items-center w-full max-w-7xl mx-auto">
          <div className="text-stone-500 font-bold text-sm tracking-widest uppercase bg-white/70 px-5 py-2.5 rounded-full backdrop-blur-md shadow-sm border border-white/50">
            {currentSlide + 1} / {slides.length}
          </div>
          <div className="flex space-x-3 md:space-x-4">
            <button 
              onClick={() => setCurrentSlide(s => Math.max(s - 1, 0))}
              disabled={currentSlide === 0}
              className={`p-3 md:p-4 rounded-full flex items-center justify-center transition-all ${
                currentSlide === 0 
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed opacity-50' 
                  : 'bg-white shadow-xl text-stone-700 hover:text-emerald-700 hover:scale-110 active:scale-95 border border-stone-100'
              }`}
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button 
              onClick={() => setCurrentSlide(s => Math.min(s + 1, slides.length - 1))}
              disabled={currentSlide === slides.length - 1}
              className={`p-3 md:p-4 rounded-full flex items-center justify-center transition-all ${
                currentSlide === slides.length - 1 
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed opacity-50' 
                  : 'bg-white shadow-xl text-stone-700 hover:text-emerald-700 hover:scale-110 active:scale-95 border border-stone-100'
              }`}
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
