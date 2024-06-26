import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

interface FormState {
  projectName: string;
  projectType: string;
  primaryTextPurpose: string;
  secondaryTextPurpose: string;
  designStyle: string[];
  readabilityImportance: number;
  screenPrintOptimization: string;
  sampleText: string;
  fontLicensing: string;
}

const FontRecommender: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    projectName: '',
    projectType: '',
    primaryTextPurpose: '',
    secondaryTextPurpose: '',
    designStyle: [],
    readabilityImportance: 5,
    screenPrintOptimization: '',
    sampleText: '',
    fontLicensing: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const handleInputChange = (name: keyof FormState, value: string | number | string[]) => {
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean, value: string) => {
    setFormState(prev => ({
      ...prev,
      designStyle: checked
        ? [...prev.designStyle, value]
        : prev.designStyle.filter(item => item !== value)
    }));
  };

  useEffect(() => {
    const requiredFields: (keyof FormState)[] = ['projectType', 'primaryTextPurpose', 'designStyle', 'screenPrintOptimization', 'fontLicensing'];
    const isFormValid = requiredFields.every(field => {
      if (Array.isArray(formState[field])) {
        return (formState[field] as string[]).length > 0;
      }
      return formState[field] !== '';
    });
    setIsFormValid(isFormValid);
  }, [formState]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      console.log('Form submitted:', formState);
      // Here you would typically send the form data to a backend or process it
    }
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
      initial="hidden"
      animate="visible"
      variants={fadeInUpVariants}
    >
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">Font Recommender</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div variants={fadeInUpVariants}>
          <Label htmlFor="projectName">Project Name (Optional)</Label>
          <Input
            id="projectName"
            value={formState.projectName}
            onChange={(e) => handleInputChange('projectName', e.target.value)}
            className="mt-1"
          />
        </motion.div>

        <motion.div variants={fadeInUpVariants}>
          <Label htmlFor="projectType">Project Type (Required)</Label>
          <Select onValueChange={(value) => handleInputChange('projectType', value)}>
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Select a project type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Website">Website</SelectItem>
              <SelectItem value="Mobile App">Mobile App</SelectItem>
              <SelectItem value="Print Design">Print Design</SelectItem>
              <SelectItem value="Branding">Branding</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        <motion.div variants={fadeInUpVariants}>
          <Label htmlFor="primaryTextPurpose">Primary Text Purpose (Required)</Label>
          <Select onValueChange={(value) => handleInputChange('primaryTextPurpose', value)}>
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Select primary text purpose" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Headline">Headline</SelectItem>
              <SelectItem value="Body Text">Body Text</SelectItem>
              <SelectItem value="Display Text">Display Text</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        <motion.div variants={fadeInUpVariants}>
          <Label htmlFor="secondaryTextPurpose">Secondary Text Purpose (Optional)</Label>
          <Select onValueChange={(value) => handleInputChange('secondaryTextPurpose', value)}>
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Select secondary text purpose" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Headline">Headline</SelectItem>
              <SelectItem value="Body Text">Body Text</SelectItem>
              <SelectItem value="Display Text">Display Text</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        <motion.div variants={fadeInUpVariants}>
          <Label className="mb-2">Design Style (Required)</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {['Modern', 'Classic', 'Minimalist', 'Vintage', 'Playful', 'Professional', 'Elegant'].map((style) => (
              <div key={style} className="flex items-center space-x-2">
                <Checkbox 
                  id={style}
                  checked={formState.designStyle.includes(style)}
                  onCheckedChange={(checked) => handleCheckboxChange(checked as boolean, style)}
                />
                <Label htmlFor={style}>{style}</Label>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeInUpVariants}>
          <Label htmlFor="readabilityImportance" className="mb-2">
            Readability Importance: {formState.readabilityImportance}
          </Label>
          <Slider
            defaultValue={[5]}
            max={10}
            step={1}
            onValueChange={(value) => handleInputChange('readabilityImportance', value[0])}
            className="mt-2"
          />
        </motion.div>

        <motion.div variants={fadeInUpVariants}>
          <Label className="mb-2">Screen or Print Optimization (Required)</Label>
          <RadioGroup onValueChange={(value) => handleInputChange('screenPrintOptimization', value)}>
            <div className="flex space-x-4 mt-2">
              {['Screen', 'Print', 'Both'].map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option}>{option}</Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </motion.div>

        <motion.div variants={fadeInUpVariants}>
          <Label htmlFor="sampleText">Sample Text (Optional)</Label>
          <Textarea
            id="sampleText"
            value={formState.sampleText}
            onChange={(e) => handleInputChange('sampleText', e.target.value)}
            placeholder="Enter your sample text here..."
            className="mt-1"
          />
        </motion.div>

        <motion.div variants={fadeInUpVariants}>
          <Label htmlFor="fontLicensing">Font Licensing (Required)</Label>
          <Select onValueChange={(value) => handleInputChange('fontLicensing', value)}>
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Select font licensing" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Free">Free</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Both">Both</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        <motion.div 
          variants={fadeInUpVariants}
          className="relative"
        >
          <Button
            type="submit"
            className={cn(
              "w-full py-2 px-4 text-white transition-all duration-300 ease-out transform hover:scale-105",
              isFormValid
                ? "bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500"
                : "bg-gray-300 cursor-not-allowed"
            )}
            disabled={!isFormValid}
          >
            Get Recommendations
          </Button>
          {isFormValid && (
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500 to-teal-400 blur-lg opacity-30 transition-opacity duration-300" />
          )}
        </motion.div>
      </form>
    </motion.div>
  );
};

export default FontRecommender;