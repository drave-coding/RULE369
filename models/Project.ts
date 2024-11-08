// models/Project.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IProject extends Document {
  userId: string;
  projectName: string;
  description: string;
  industry: string;
  transaction: string;
  dateRange: {
    from: Date;
    to: Date;
  };
  competitors: {
    name: string;
    link: string;
  }[];
}

const ProjectSchema: Schema = new Schema({
  userId: { type: String, required: true },
  projectName: { type: String, required: true },
  description: { type: String, required: true },
  industry: { type: String, required: true },
  transaction: { type: String, required: true },
  dateRange: {
    from: { type: Date, required: true },
    to: { type: Date, required: true },
  },
  competitors: [
    {
      name: { type: String, required: true },
      link: { type: String, required: true },
    },
  ],
});

const Project = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
