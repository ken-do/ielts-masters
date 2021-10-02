import { Answer } from './Answer'
import { Article } from './Article'
import Category from './Category'
import { Comment } from './Comment'
import { Paragraph } from './Paragraph'
import Post from './Post'
import PostTag from './PostTag'
import { Question } from './Question'
import Tag from './Tag'
import { TaskType } from './TaskType'
import { Test } from './Test'
import { TestArticle } from './TestArticle'
import { TestMode } from './TestMode'
import { TestQuestion } from './TestQuestion'
import { TestType } from './TestType'
import { User } from './User'
import { UserTest } from './UserTest'

//Model Associations

// test - test_type
export const TESTYPE_TEST = TestType.hasMany(Test, {
    foreignKey: { allowNull: false },
})
export const TEST_TESTTYPE = Test.belongsTo(TestType)

// test - test_mode
export const TESTMODE_TEST = TestMode.hasMany(Test, {
    foreignKey: { allowNull: false },
})
export const TEST_TESTMODE = Test.belongsTo(TestMode)

// test - article
export const TEST_ARTICLE = Test.belongsToMany(Article, {
    through: TestArticle,
})
export const ARTICLE_TEST = Article.belongsToMany(Test, {
    through: TestArticle,
})
export const TEST_TESTARTICE = Test.hasMany(TestArticle)
export const TESTARTICE_TEST = TestArticle.belongsTo(Test)
export const ARTICLE_TESTARTICLE = Article.hasMany(TestArticle)
export const TESTARTICLE_ARTICLE = TestArticle.belongsTo(Test)

// test - question
export const TEST_QUESTION = Test.belongsToMany(Question, {
    through: TestQuestion,
})
export const QUESTION_TEST = Question.belongsToMany(Test, {
    through: TestQuestion,
})

// article - paragraph
export const ARTICLE_PARAGRAPH = Article.hasMany(Paragraph, {
    foreignKey: { allowNull: false },
})
export const PARAGRAPH_ARTICLE = Paragraph.belongsTo(Article)

// paragraph - question
export const PARAGRAPH_QUESTION = Paragraph.hasMany(Question, {
    foreignKey: { allowNull: false },
})
export const QUESTION_PARAGRAPH = Question.belongsTo(Paragraph)

// question - question
export const QUESTION_RELATEDQUESTION = Question.hasOne(Question, {
    as: 'relatedQuestion',
    foreignKey: 'relatedQuestionId',
})
export const RELATEDQUESTION_QUESTION = Question.belongsTo(Question, {
    foreignKey: 'relatedQuestionId',
})

// question - answer
export const QUESTION_ANSWER = Question.hasMany(Answer, {
    foreignKey: { allowNull: false },
})
export const ANSWER_QUESTION = Answer.belongsTo(Question)

// task_type - question
export const TASKTYPE_QUESTION = TaskType.hasMany(Question, {
    foreignKey: { allowNull: false },
})
export const QUESTION_TASKTYPE = Question.belongsTo(TaskType)

// test - user
export const TEST_USER = Test.belongsToMany(User, {
    through: UserTest,
})
export const USER_TEST = User.belongsToMany(Test, {
    through: UserTest,
})
export const TEST_USERTEST = Test.hasMany(UserTest)
export const USERTEST_TEST = UserTest.belongsTo(Test)
export const USER_USERTEST = User.hasMany(UserTest)
export const USERTEST_USER = UserTest.belongsTo(User)

// test - comment
export const TEST_COMMENT = Test.hasMany(Comment, {
    foreignKey: { allowNull: false },
})
export const COMMENT_TEST = Comment.belongsTo(Test)
// user - comment
export const USER_COMMENT = User.hasMany(Comment, {
    foreignKey: { allowNull: false },
})
export const COMMENT_USER = Comment.belongsTo(User)
// category - post
export const CATEGORY_POST = Category.hasMany(Post)
export const POST_CATEGORY = Post.belongsTo(Category)
// user - post
export const USER_POST = User.hasMany(Post)
export const POST_USER = Post.belongsTo(User)
// post - tag
export const POST_TAG = Post.belongsToMany(Tag, {
    through: PostTag,
})
export const TAG_POST = Tag.belongsToMany(Post, {
    through: PostTag,
})
export const POST_POSTTAG = Post.hasMany(PostTag)
export const POSTTAG_POST = PostTag.belongsTo(Post)
export const TAG_POSTTAG = Tag.hasMany(PostTag)
export const POSTTAG_TAG = PostTag.belongsTo(Tag)
