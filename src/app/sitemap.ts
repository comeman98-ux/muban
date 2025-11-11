import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base极Url = 'https://fulizhe.com'
  const lastModified = new Date()

  // 定义所有公开页面
  const routes: MetadataRoute.Sitemap = [
    // 首页 - 最高优先级
    {
      url: base极Url,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
    },

    // 核心功能页面 - 高优先级
    {
      url: `${base极Url}/dashboard`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${base极Url}/tools/position-calculator`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    // 培训计划页面 - 高优先级
    {
      url: `${base极Url}/splan/join-us`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${base极Url}/splan/courses`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${base极Url}/splan/psychology-test`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${base极Url}/splan/faq`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base极Url}/splan/donate`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.75,
    },

    // 内容页面
    {
      url: `${base极Url}/history`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base极Url}/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  return routes
}
