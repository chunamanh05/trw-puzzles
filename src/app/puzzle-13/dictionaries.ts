export type Locale = 'en' | 'vi' | 'es';

export const dictionaries = {
  en: {
    nav: { home: "Home", services: "Services", about: "About", contact: "Contact" },
    hero: { title: "Our Services", subtitle: "Comprehensive AI solutions tailored to your business needs" },
    services: [
      { id: "ml", title: "Machine Learning Solutions", desc: "Custom ML models that learn from your data to predict outcomes, automate decisions, and unlock insights." },
      { id: "nlp", title: "Natural Language Processing", desc: "Advanced NLP systems for chatbots, sentiment analysis, document processing, and language understanding." },
      { id: "cv", title: "Computer Vision", desc: "Image and video analysis solutions for object detection, facial recognition, and visual quality control." },
      { id: "strategy", title: "AI Strategy Consulting", desc: "Expert guidance on AI adoption, implementation roadmaps, and organizational transformation." },
      { id: "predictive", title: "Predictive Analytics", desc: "Data-driven forecasting models to anticipate trends, optimize operations, and reduce risks." },
      { id: "integration", title: "AI Integration", desc: "Seamless integration of AI capabilities into your existing systems and workflows." }
    ]
  },
  vi: {
    nav: { home: "Trang chủ", services: "Dịch vụ", about: "Giới thiệu", contact: "Liên hệ" },
    hero: { title: "Dịch Vụ Của Chúng Tôi", subtitle: "Giải pháp Trí tuệ nhân tạo toàn diện được tinh chỉnh cho doanh nghiệp của bạn" },
    services: [
      { id: "ml", title: "Giải Pháp Học Máy", desc: "Mô hình Học máy tùy chỉnh giúp học từ dữ liệu để dự báo kết quả, tự động hóa quyết định và khai phá tiềm năng." },
      { id: "nlp", title: "Xử Lý Ngôn Ngữ Tự Nhiên", desc: "Hệ thống NLP nâng cao cho chatbot, phân tích sắc thái, xử lý văn bản và thấu hiểu ngôn ngữ." },
      { id: "cv", title: "Thị Giác Máy Tính", desc: "Giải pháp phân tích hình ảnh và video để phát hiện đối tượng, nhận diện khuôn mặt và kiểm soát chất lượng quang học." },
      { id: "strategy", title: "Tư Vấn Chiến Lược AI", desc: "Tư vấn chuyên sâu về ứng dụng AI, xây dựng lộ trình triển khai và chuyển đổi số cho tổ chức." },
      { id: "predictive", title: "Phân Tích Dự Đoán", desc: "Mô hình dự báo dựa trên dữ liệu giúp đón đầu xu hướng, tối ưu hóa vận hành và giảm thiểu rủi ro." },
      { id: "integration", title: "Tích Hợp AI", desc: "Tích hợp mượt mà các tính năng AI vào hệ thống và quy trình làm việc hiện tại của bạn." }
    ]
  },
  es: {
    nav: { home: "Inicio", services: "Servicios", about: "Nosotros", contact: "Contacto" },
    hero: { title: "Nuestros Servicios", subtitle: "Soluciones integrales de IA adaptadas a las necesidades de su negocio" },
    services: [
      { id: "ml", title: "Soluciones de Machine Learning", desc: "Modelos personalizados de ML que aprenden de sus datos para predecir resultados, automatizar decisiones y revelar insights." },
      { id: "nlp", title: "Procesamiento de Lenguaje Natural", desc: "Sistemas avanzados de NLP para chatbots, análisis de sentimientos, procesamiento de documentos y comprensión del lenguaje." },
      { id: "cv", title: "Visión por Computadora", desc: "Soluciones de análisis de imagen y video para detección de objetos, reconocimiento facial y control de calidad visual." },
      { id: "strategy", title: "Consultoría Estratégica en IA", desc: "Orientación experta sobre adopción de IA, hojas de ruta de implementación y transformación organizacional." },
      { id: "predictive", title: "Análisis Predictivo", desc: "Modelos de pronóstico basados en datos para anticipar tendencias, optimizar operaciones y reducir riesgos." },
      { id: "integration", title: "Integración de IA", desc: "Integración perfecta de capacidades de inteligencia artificial en sus sistemas y flujos de trabajo existentes." }
    ]
  }
};
